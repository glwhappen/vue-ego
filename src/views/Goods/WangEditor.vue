<template>
  <div id="main">
    <p>富文本编译</p>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'WangEditor',
  data() {
    return {
      editor: ''
    }
  },
  mounted () {
    // 创建wangeditor
    this.editor = new E('#main')
    this.editor.config.onchange = newHtml => {
      // 将html内容传到父组件
      this.$emit('sendEditor', newHtml)
    }
    this.editor.config.onchangeTimeout = 500
    this.editor.config.focus = false

    this.editor.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      'link',
      'list',
      'todo',
      'justify',
      'quote',
      'emoticon',
      'image',
      'video',
      'table',
      'code',
      'splitLine',
      'undo',
      'redo',
    ]

    this.editor.create()
  }
}
</script>

<style scoped>

</style>
