<?php

namespace MatrixAddons\EasyInvoice\Admin\FieldItems;

class Editor
{
	public static function render($field, $field_id, $value, $group_id = null)
	{
		$field_name = !(is_null($group_id)) ? $group_id . '[' . $field_id . ']' : $field_id;

		$class = $field['class'] ?? '';

?>
		<div class="matrixaddons-fieldset">
			<?php

			$settings = array(
				'textarea_name' => $field_name,
				'tinymce' => array(
					'toolbar1' => 'formatselect, bold,italic,underline, blockquote, strikethrough, bullist, numlist, separator,alignleft,aligncenter,alignright,separator,link,unlink,undo,redo',
					'block_formats' => 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6',
					'height' => 300, // Adjust the height if needed
				),
				'editor_height' => 150, // In pixels, takes precedence and has no default value
			);

			$editor_id = $field_name . '_id';

			$value = $value == null ? "" : $value;

			wp_editor($value, $editor_id, $settings);
			?>
		</div>
<?php
	}

	public static function sanitize($field, $raw_value, $field_id)
	{
		$allowed_html = $field['allowed_html'] ?? array(
			'p' => array('style' => array()),
			'a' => array('href' => array(), 'target' => array(), 'rel' => array()),
			'br' => array(),
			'b' => array(),
			'strong' => array(),
			'em' => array(),
			'i' => array(),
			'u' => array(),
			'blockquote' => array(),
			'del' => array(),
			'ins' => array(),
			'img' => array('src' => array(), 'height' => array(), 'width' => array()),
			'ul' => array(),
			'ol' => array(),
			'li' => array(),
			'code' => array(),
			'span' => array('style' => array()),
			// ✅ Add heading tags:
			'h1' => array(),
			'h2' => array(),
			'h3' => array(),
			'h4' => array(),
			'h5' => array(),
			'h6' => array(),
		);

		return wp_kses($raw_value, $allowed_html);
	}
}
