<template>
  <div>
    <div class="text-center mb-6">
      <h1>ຫົວຂໍ້ຂ່າວຫົວຢ່າງ {{ $route.params.id }}. {{ title }}</h1>
    </div>
    <div class="d-flex flex-row justify-center">
      <v-img
        :aspect-ratio="16 / 9"
        :src="cover"
        max-width="900"
        width="100%"
        contain
      ></v-img>
    </div>
    <div class="my-8">
      <v-divider inset></v-divider>
      <froalaView v-model="content" class="mt-12"></froalaView>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: `Guide: The Next Generation WYSIWYG HTML Editor`,
    cover:
      'https://image.freepik.com/free-vector/before-blood-donation-infographic-illustration_74440-543.jpg',
    content: `

<p style="text-align: center;"><span style="font-size: 14px;">&rarr; This is a full-featured demo. Try it and see for yourself!&nbsp;</span><span style="font-size:14px;">&larr;</span></p>
<p style="text-align: center;"><span style="font-size:14px;"><img src="blob:https://froala.com/7984f738-08bc-4b04-ad80-d3d05580d262" style="width: 800px;" class="fr-fic fr-dib"></span>
   <br>
</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies nibh mollis, ullamcorper ex ac, tempor sapien. Donec leo massa, hendrerit at quam gravida, pharetra pretium sem. Ut convallis est id erat cursus feugiat. Fusce gravida mollis vestibulum. Phasellus feugiat facilisis rhoncus. Quisque tincidunt massa dui, sit amet dapibus eros feugiat ut. Vivamus velit leo, ullamcorper ut facilisis id, facilisis nec nulla. Nam vitae purus nunc. Nulla facilisi. Maecenas quis porttitor quam, porttitor euismod nunc. Maecenas maximus tristique tempus. Aenean convallis augue mauris, vel porta sapien ultricies non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed finibus massa sed lobortis placerat. Mauris ultricies neque magna, non blandit metus vehicula at.</p>
<p>Suspendisse accumsan lectus et est dictum facilisis nec quis libero. Suspendisse tempor quam non arcu volutpat, pretium elementum ex sodales. Proin tristique eu nibh et consequat. Nam vel pharetra eros. Curabitur non ligula mattis, semper purus a, molestie ipsum. Nunc condimentum, velit non malesuada efficitur, tellus nibh dapibus purus, vitae dignissim nunc urna eget ante. Suspendisse potenti.</p>
<p>Maecenas sed arcu ullamcorper, accumsan augue a, consequat elit. Pellentesque et mi commodo, aliquam eros iaculis, efficitur est. Curabitur et ipsum pretium tortor ornare pulvinar in vitae ante. Phasellus ultrices pellentesque neque tristique gravida. Aliquam malesuada orci in interdum tempus. Mauris et orci dictum, tristique enim vel, ultrices nisl. Morbi eleifend sem et placerat porta. Pellentesque rutrum eu tortor non hendrerit. Etiam in erat a nisi blandit elementum. Vestibulum nisl est, vulputate ac nisi et, euismod finibus sem. Praesent dignissim ac enim id lobortis. Suspendisse potenti. Integer odio nisl, vulputate id dui id, mollis congue nulla. Pellentesque convallis eros ut est feugiat posuere. Phasellus egestas nunc non lacus maximus fermentum. Duis malesuada tortor id neque accumsan efficitur.</p>
<p>Ut eleifend risus at neque tempus, non dictum sapien laoreet. Integer dapibus in dui quis scelerisque. Duis tempor velit eu orci accumsan, porta consectetur neque pellentesque. Sed a ultricies nulla. Pellentesque pulvinar ipsum quis urna tincidunt, in pulvinar tortor suscipit. In convallis ornare volutpat. Ut ornare, enim vitae congue pharetra, lorem lectus convallis nisi, ut venenatis tellus turpis eu sem. Morbi vitae aliquam tortor. Nam vitae erat varius, vehicula turpis eget, porta urna. Praesent dictum mauris a ex malesuada, quis aliquam neque gravida. Praesent consequat pretium elit sed scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.&nbsp;</p>
<table class="fr-dashed-borders fr-alternate-rows" style="width: 100%;">
   <tbody>
      <tr>
         <td style="text-align: center;"><span style="font-size: 24px;">Complete<a href="https://froala.com/wysiwyg-editor/docs/" title="Documentation">&nbsp;<strong>documentation</strong></a>&nbsp;</span><span class="fr-emoticon fr-deletable fr-emoticon-img" style='background: url("https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f4da.svg"); font-size: 24px;'>&nbsp;</span>
            <br>
         </td>
         <td style="text-align: center;"><span style="font-size: 24px;">Framework <strong><a href="https://froala.com/wysiwyg-editor/docs/framework-plugins/">plugins</a></strong>&nbsp;</span><span class="fr-emoticon fr-deletable fr-emoticon-img" style='background: url("https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f50c.svg"); font-size: 24px;'>&nbsp;</span>
            <br>
         </td>
         <td style="text-align: center;"><span style="color: rgb(0, 0, 0); font-size: 24px;">Tons of&nbsp;</span><strong><span style="font-size: 24px;"><a href="https://froala.com/wysiwyg-editor/examples/">examples</a>&nbsp;</span></strong><span class="fr-emoticon fr-deletable fr-emoticon-img" style='background: url("https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f320.svg"); font-size: 24px;'>&nbsp;</span>
            <br>
         </td>
      </tr>
   </tbody>
</table>

`
  })
}
</script>
