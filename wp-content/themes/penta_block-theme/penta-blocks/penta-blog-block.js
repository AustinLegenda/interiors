import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

wp.blocks.registerBlockType("pentaportfoliogrid/penta-blog-block", {
    title: __("Penta Blog Block", "second nav"),
    icon: "grid-view",
    edit: EditComponent,
    save: SaveComponent,
});

function EditComponent() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryIds, setCategoryIds] = useState([]);

    // Fetch child categories of category ID 3
    useEffect(() => {
        apiFetch({ path: '/wp/v2/categories?parent=3' }).then((fetchedCategories) => {
            setCategories(fetchedCategories);
            // Extract the category IDs to use for filtering posts
            const ids = fetchedCategories.map(category => category.id);
            setCategoryIds(ids);
        });
    }, []);

    // Fetch posts based on selected category or all child categories of category 3
    useEffect(() => {
        let categoryFilter;
        if (selectedCategory) {
            categoryFilter = `?categories=${selectedCategory}`;
        } else {
            categoryFilter = `?categories=${categoryIds.join(',')}`; // Use all child category IDs
        }
        
        apiFetch({ path: `/wp/v2/posts${categoryFilter}&per_page=20&_embed` }).then((fetchedPosts) => {
            setPosts(fetchedPosts);
        });
    }, [selectedCategory, categoryIds]);

    // Handle category selection
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const renderPostContainer = () => {
        return posts.map((post) => {
            // Extract the featured image URL from the embedded data
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

            return (
                
                    <div key={post.id} className="post-item">
                        <a href={post.link}>
                            <div className="post-img-container">
                                {featuredImage ? (
                                    <img
                                        src={featuredImage}
                                        alt={post.title.rendered}
                                        loading="lazy"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <div className="placeholder">No Image</div>
                                )}
                            </div>
                            <div className="post-intro">
                                <h3>{post.title.rendered}</h3>
                                <div
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                />
                            </div>
                        </a>
                    </div>
               
            );
        });
    };

    return (
        <>
            <div className="cat-menu-container main-grid-full">
                <ul>
                    <li>
                        <a
                            className={`cat-menu-item ${!selectedCategory ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(null)}
                        >
                            All
                        </a>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <a
                                className={`cat-menu-item ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main-grid">
            <article  className="post-container main-grid-full">
                {renderPostContainer()}
            </article>
            </div>
        </>
    );
}

function SaveComponent() {
    return null; // Render handled on the server via PHP template
}