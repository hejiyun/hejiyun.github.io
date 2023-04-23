<!-- CREATE by WangXinzhao at 2022/9/16 00:45 -->
<template>
  <article class="zh-tw">
    <p>HeartX（“HeartX”或“我们”或“我们的”）提供您（“艺术家”或“您”或“您的”）通过 HeartX 产品和服务，包括任何 HeartX 移动应用程序（统称为“服务”），在 HeartX 中展示或出售艺术品或其它发布内容（每项均为“物品”）的基本条款和条件。当您一旦在此页面进行HeartX社区艺术家注册并发表内容，您所发表的内容将成为HeartX社区内的一部分, 我们将视您已经同意并遵守以下合作协议。</p>
    <p>請您務必遵循以下協議及您的陳述和保證，若您違反了其中任意一條或相關法律法規所引發的一切不良後果或法律責任，則由您獨自承擔。</p>
    <h3>HeartX保護原創作品</h3>
    <p>HeartX鼓励并保护原创作品，如绘画、雕塑、摄影等艺术品，或文章、视频、图片、歌曲、书籍、音乐等发布内容。全球各地版权法旨在保护创作者的原创作品，要获得版权保护，作品必须是由作者创作的，并具有一定程度的创新性。HeartX将致力于原创作品及内容的版权保护，如果您是原创作品的作者，并发现在HeartX上有您的创作但非由您本人或指定代理机构上传的作品，请和我们联系，我们将协助核查及处理。</p>
    <h3>本著雙方誠信及公平原則，為共同繁榮HeartX藝術社區，請在HeartX社區：</h3>
    <ul>
      <li>· 寬容和理性對待不同藝術風格、藝術觀點、審美傾向和學術意見；</li>
      <li>· 和其他社區成員自由分享、開放探討、文明交流。</li>
      <li>· 發表原創的、不存在著作糾紛的內容；</li>
      <li>· 尊重他人著作權、個人隱私和聲譽；</li>
    </ul>
    <div class="table-wrap" v-if="!isMobile">
      <div class="table">
        <table>
          <thead>
          <tr>
            <th><div>{{tableDetail.notWebcome.title}}</div></th>
            <th><div>{{tableDetail.prohibit.title}}</div></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(n,i) in Math.max(tableDetail.notWebcome.list.length,tableDetail.prohibit.list.length)" :key="i">
            <td><div>{{tableDetail.notWebcome.list[i] || ' '}}</div></td>
            <td><div>{{tableDetail.prohibit.list[i] || ' '}}</div></td>
          </tr>
          <tr>
            <td colspan="2"><div><i class="required-chart"></i> {{tableDetail.tips}}</div></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <template v-else>
      <div class="table-wrap mobile" v-for="(v,i) in ['notWebcome','prohibit']" :key="i">
        <div class="table">
          <table>
            <thead>
            <tr>
              <th><div>{{tableDetail[v].title}}</div></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,key) in tableDetail[v].list" :key="key">
              <td><div>{{item}}</div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p colspan="2"><i class="required-chart"></i> {{tableDetail.tips}}</p>
    </template>
    <h3>藝術家的陳述和保證</h3>
    <ul>
      <li>您聲明並保證</li>
      <li>1、您是每件作品（發表內容）的唯一所有者，或獲得每件作品（發表內容）所有者的正式授權以提供和出售此類作品；</li>
      <li>2、您有權根據本協議提供和銷售每件作品；</li>
      <li>3、在出售時，每件作品的良好、有效和可銷售的所有權和占有權將轉移給買方，不受任何第三方的任何索賠、限製、留置權或其他產權負擔，包括但不限於政府或政府的索賠代理機構和任何轉售合同限製；</li>
      <li>4、每件作品都是真實的，不是偽造的；</li>
      <li>5、您已提供 HeartX，並且在在線銷售結束之前，您將繼續向 HeartX 提供您所擁有的有關該作品的所有信息，包括真實性、出處、修復和狀況，並且您保證此類信息是準確的，並且您授權 HeartX 應潛在買家的要求與他們共享此類信息；</li>
      <li>6、如果適用，每件物品均已合法進口到其當前所在的司法管轄區並根據其先前所在國家/地區的法律合法出口，以及此類進出口的任何稅費和/或關稅已付款；</li>
      <li>7、您提供的用於描述作品的任何和所有數據都是準確的；</li>
      <li>8、除非另有明確說明，否則您將收取、支付、報告和匯繳任何和所有賣方稅款以及適用法律要求的與每件作品的上市、營銷、報價或銷售有關的任何其他稅款和關稅。</li>
    </ul>
    <p>&nbsp;</p>
  </article>
</template>
<script setup>
import {ref, onMounted, reactive, onBeforeMount} from 'vue'

const tableDetail = ref({
  notWebcome:{
    title:'HeartX不歡迎',
    list:[
      '發表個人相關的社交賬號或網站等任何第三方網絡平臺的鏈接地址或聯系方式（包括但不限電話號碼、電子郵箱及聯系地址）；',
      '發表任何與銷售引導有關的信息（包括但不限第三方商鋪信息或聯系方式、第三方電子商務平臺的鏈接地址）；',
      '通過本社區進行活動征集、商務及個人的宣傳推廣活動；',
      '向社區註冊用戶發表騷擾性、廣告性、推廣性的評論與私信。',
      '發表與藝術作品無關的內容，包括但不限於個人自拍或生活照片、網絡截圖、商業廣告，或其他非藝術相關新聞信息和評論等；'
    ]
  },
  prohibit:{
    title:'HeartX禁止',
    list:[
      '發表有可能侵犯他人著作權等相關的內容（包括但不限於臨摹或抄襲等）；',
      '發表針對種族、國家、民族、宗教、性別、年齡、地域、性取向、生理特征的歧視和仇恨性內容；',
      '發表含有不雅詞句、人身攻擊、故意滋事、邪教或暴力組織相關的和一切帶有惡意不法成分的內容；',
      '發表不利於青少年健康成長的色情、暴力、汙穢性內容；',
      '發表政治類或政治暗示類的激進內容或意識形態討論，及一切違反法律法規的內容；',
      '發表侮辱、損害HeartX品牌形象及品牌價值的一切內容。',
    ]
  },
  tips:'*如果您發表了上述內容，它們將立刻被刪除，您的相關賬號或IP地址將被封禁；行為嚴重者, HeartX保留遞交司法機構處理的權力。如果造成HeartX平臺或其他社區用戶的損失，HeartX保留追責的權力。 '
})
const isMobile=ref(window.innerWidth<768);
onBeforeMount(()=>{
  window.addEventListener('resize',()=>{
    isMobile.value = window.innerWidth<768;
  })
})
onMounted(() => {

})

</script>
<style lang="scss" scoped>
</style>
