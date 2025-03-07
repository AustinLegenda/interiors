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
							'toolbar1' => 'bold,italic,underline, blockquote, strikethrough, bullist, numlist, separator,alignleft,aligncenter,alignright,separator,link,unlink,undo,redo'
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
						'p' => array(
								'style' => array()
						),
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
						'img' => array(
								'src' => array(),
								'height' => array(),
								'width' => array()
						),
						'ul' => array(),
						'ol' => array(),
						'li' => array(),
						'code' => array(),
						'span' => array('style' => array()
						)
				);

		return wp_kses($raw_value, $allowed_html);
	}
}
