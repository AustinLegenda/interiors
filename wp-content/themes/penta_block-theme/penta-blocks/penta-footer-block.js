import { InnerBlocks } from '@wordpress/block-editor';

wp.blocks.registerBlockType("pentablocktheme/penta-footer-block", {
    title: "Penta Footer Block",
    edit: EditComponent,
    save: SaveComponent,
});

function EditComponent() {
    return (
        <footer className="wp-block-pentablocktheme-penta-footer-block">
            <div className="main-grid">
                <div className="main-grid-full grid-center">
                    <InnerBlocks />
                </div>
            </div>
        </footer>

    );
}

function SaveComponent() {
    return (
        <footer className="wp-block-pentablocktheme-penta-footer-block">
            <div className="main-grid">
                <div className="main-grid-full grid-center">
                    <InnerBlocks.Content />
                </div>
            </div>
        </footer>
    );
}