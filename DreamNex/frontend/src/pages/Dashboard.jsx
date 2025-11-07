import React from 'react';
import { useAuth } from '../hooks/useAuth';
import ProductCard from '../components/ProductCard';
import './Dashboard.css'; // Assuming you have a CSS file for styling

const Dashboard = () => {
    const { user } = useAuth();
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        // Fetch user's products from the backend
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/products?userId=${user.id}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [user.id]);

    return (
        <div className="dashboard">
            <h1>Welcome to your Dashboard, {user.name}!</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;