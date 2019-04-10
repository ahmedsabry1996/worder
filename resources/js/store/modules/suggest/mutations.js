import Vue from 'vue';
export default{
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
},

  logoutSuggest(state){
    state.allSuggesstion=[];
    state.suggestedPeople=[];
}

}
