<template>
<div class="frame">
  <span v-if="load">You have submitted feedback</span>
  <button @click="loadMyFeedback()" v-if="!load">+ Write my feedback</button>
  <hr/>
  <div v-for="(item, index) in ratings" v-bind:key="index" class="load">
    <div class="innerBlock">
      {{item.username}}<br/>
      Rating:   <span class="stars-bg-o">   <i class="star-active-o" :style="trans(item.rating)"></i></span><br/>
      Comment: {{item.text}}
    </div>
    <hr>
  </div>
  <div class="load2" v-if="!empty">End</div>
  <div v-show="empty" v-if="empty">
    No rating records found.
  </div>
</div>
</template>

<script>
export default {
  name: 'toolRatings',
  data () {
    return {
      name: null,
      ratings: null,
      empty: false,
      showMyFeedback: false,
      load: false,
      hidden: true
    }
  },
  created: function () {
    this.$emit('type', 'Ratings')

    var id = this.$route.params.id
    this.$http.post('/api/user/getRating', {
      id: id
    }, {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
        this.empty = true
      } else {
        this.ratings = JSON.parse(response.bodyText)
      }
    })

    if (this.$cookies.get('username')) {
      this.$http.post('/api/user/checkFeedback', {
        user_id: this.$cookies.get('uid'),
        tool_id: this.$route.params.id
      }, {}).then((response) => {
        var count = JSON.parse(response.bodyText)[0].count
        if (count !== 0) {
          this.load = true
        }
      })
    }
  },
  methods: {
    trans (rate1) {
      var rate = rate1 * 20
      var rate0 = String(rate)
      return ('width:' + rate0 + '%')
    },
    checkFeedback () {
      if (this.$cookies.get('username')) {
        this.$http.post('/api/user/checkFeedback', {
          user_id: this.$cookies.get('uid'),
          tool_id: this.$route.params.id
        }, {}).then((response) => {
          var count = JSON.parse(response.bodyText)[0].count
          if (count !== 0) {
            return false
          }
        })
      }
      return true
    },
    loadMyFeedback () {
      if (!this.$cookies.get('username')) {
        this.$router.push('/login')
      } else {
        this.$cookies.set('feedback', '1', 60)
        this.$router.push('/tool/' + String(this.$route.params.id) + '/writeFeedback')
      }
    }
  }
}
</script>

<style scope>
@import 'rating.css';
.frame {
  top: 50px;
  position: relative;
  width: 800px;
  margin: 0 auto;
  padding: 0 0 50px 0;
}
.frame .load {
  text-align: left;
  width: 600px;
  position: relative;
  word-wrap:break-word;
  margin: 0 auto;
  top: 30px;
}
.frame .innerBlock {
  padding:0 30px;
  width: 540px;
  position: relative;
}
.frame .innerBlock {
  margin: 0 auto;
  position: relative;
}
.frame .load2 {
  text-align: center;
  width: 600px;
  position: relative;
  word-wrap:break-word;
  margin: 0 auto;
  top: 30px;
}
</style>
