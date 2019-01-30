export default{

  state:{
    allSuggesstion:[],
    suggestedPeople:[],
  },

  getters:{

    suggestedPeople(state){
      return state.suggestedPeople;
    },
  },

  mutations:{
    suggestedPeople(state,payload){
      state.allSuggesstion = payload;
      let firstFive = state.allSuggesstion.slice(0,5);
      state.suggestedPeople = firstFive;
},
    shuffleSuggested(state){

    let max = state.allSuggesstion.length-1;

    let newSuggestion = state.allSuggesstion.sort(function() {

      return .5 - Math.random();

    }).slice(0,5);

  console.log(newSuggestion);

  state.suggestedPeople = newSuggestion;


}
  },

  actions:{

        suggestPeople(context){
      axios.get('/api/timeline/suggest-people',{
          headers:{

          "Authorization" :`Bearer ${localStorage.getItem('access_token')}`

          }
      })
      .then((response)=>{

        let suggested = response.data.suggest_people;
        context.commit('suggestedPeople',suggested);

      })
      .catch((errors)=>{
        console.log(errors);
        console.log(errors.response);
      })
    },


  }
}
