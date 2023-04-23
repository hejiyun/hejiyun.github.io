<!-- CREATE by WangXinzhao at 2022/9/16 00:45 -->
<template>
  <article class="en-us">
    <p>HeartX ("HeartX" or "we" or "us" or "our") provides the basic terms and conditions for you ("Artist" or "you" or "your") to display or sell artwork or other published content (each, an "Item") in HeartX through HeartX products and services, including any HeartX mobile applications (collectively, the "Services"). Once you have registered and posted content to the HeartX Community Artists on this page, the content you post will become part of the HeartX Community and you will be deemed to have agreed to and abided by the following Cooperation Agreement.</p>
    <p>You must comply with the following agreement and your representations and warranties, and you shall be solely responsible for any adverse consequences or liability arising from your breach of any of them or related laws and regulations.</p>
    <h3>HeartX protects original works</h3>
    <p>HeartX encourages and protects original works of art, such as paintings, sculptures, photography, and other artwork, or published content such as articles, videos, images, songs, books, music, etc. Copyright laws around the world are designed to protect original works of authorship, and to be eligible for copyright protection, a work must be created by the author and have some degree of innovation. arteX is committed to copyright protection of original works and content, so if you are the author of an original work and find a work on HeartX that you created but was not uploaded by you or an appointed agent, please contact us and we will assist in the verification and processing.</p>
    <h3>In the spirit of mutual honesty and fairness, and in order to jointly prosper the HeartX art community, please find the following information in the HeartX community.</h3>
    <ul>
      <li>· To publish original content that is free from copyright disputes.</li>
      <li>· Respect the copyright, privacy and reputation of others.</li>
      <li>· To be tolerant and rational towards different artistic styles, artistic perspectives, aesthetic tendencies and academic opinions.</li>
      <li>· Share freely with other community members, explore openly, and communicate civilly.</li>
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
    <h3>Artist's Statement and Guarantee</h3>
    <ul>
      <li>You represent and warrant that</li>
      <li>1. you are the sole owner of each work (Published Content) or are duly authorized by the owner of each work (Published Content) to offer and sell such work.</li>
      <li>2. you have the right to offer and sell each work under this Agreement.</li>
      <li>3. upon sale, good, valid and marketable title and possession of each work shall pass to the purchaser free and clear of any claims, restrictions, liens or other encumbrances of any third party, including but not limited to the government or the government's claims agent and any resale contract restrictions.</li>
      <li>4. each work is real, not forged.</li>
      <li>5. you have provided HeartX with, and you will continue to provide HeartX with, all information in your possession about the work, including authenticity, provenance, restoration and condition, until the end of the online sale, and you warrant that such information is accurate and that you authorize HeartX to share such information with prospective purchasers upon their request.</li>
      <li>6. if applicable, that each item has been legally imported into the jurisdiction in which it is currently located and legally exported in accordance with the laws of the country/territory in which it was previously located, and that any taxes and/or duties on such import or export have been paid.</li>
      <li>7. that any and all data provided by you for use in describing the work are accurate.</li>
      <li>8. Unless otherwise expressly stated, you will collect, pay, report and remit any and all Seller Taxes and any other taxes and duties required by applicable law in connection with the listing, marketing, quotation or sale of each Work.</li>
    </ul>
    <p>&nbsp;</p>
  </article>
</template>
<script setup>
import {ref, onMounted, reactive, onBeforeMount} from 'vue'

const tableDetail = ref({
  notWebcome:{
    title:'HeartX is not welcome',
    list:[
      'Posting the link address or contact information (including but not limited to telephone number, email address and contact address) of any third party online platform such as a personal related social account or website.',
      'Publish any information related to sales lead generation (including, but not limited to, third party store information or contact details, link addresses to third party e-commerce platforms).',
      'To conduct event solicitation, business and personal promotion activities through our community.',
      'Send harassing, advertising and promotional comments and private messages to registered users of the community.',
      'Publish content unrelated to the artwork, including but not limited to personal selfies or lifestyle photos, internet screenshots, commercial advertisements, or other non-art related news and comments.'
    ]
  },
  prohibit:{
    title:'HeartX banned',
    list:[
      'Publish content that may infringe on the copyright of others (including but not limited to copying or plagiarism, etc.). ',
      'Publish discriminatory and hateful content against race, country, ethnicity, religion, gender, age, region, sexual orientation, physical characteristics.',
      'Publish content containing indecent words, personal attacks, intentional nuisance, cult or violent organization related and all content with malicious and unlawful elements.',
      'Publish pornographic, violent, or obscene content that is not conducive to the healthy growth of youth.',
      'Publish political or politically suggestive radical content or ideological discussions, and any content that violates laws and regulations. ',
      'Publish anything that insults or damages HeartX\'s brand image and brand values. ',
    ]
  },
  tips:'If you post any of the above, they will be immediately deleted and your account or IP address will be blocked; in serious cases, HeartX reserves the right to refer the matter to judicial authorities. HeartX reserves the right to pursue liability for any damage caused to the HeartX platform or other community users. '
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
