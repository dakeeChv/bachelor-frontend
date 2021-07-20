<template>
  <ckeditor
    :editor="editor"
    :value="content"
    :config="editorConfig"
    @input="$emit('onInput', $event)"
  ></ckeditor>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  props: ['content'],
  data: () => {
    return {
      // editor
      editor: ClassicEditor,
      editorConfig: {
        // mediaEmbed: {
        //   previewsInData: true
        // },
        toolbar: {
          items: [
            'heading',
            '|',
            'alignment',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
          ]
        },
        image: {
          // Configure the available styles.
          styles: ['alignLeft', 'alignCenter', 'alignRight'],

          // You need to configure the image toolbar, too, so it shows the new style
          // buttons as well as the resize buttons.
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
            '|',
            'imageTextAlternative'
          ]
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        // This value must be kept in sync with the language defined in webpack.config.js.
        language: 'en'
      }
    }
  }
}
</script>
