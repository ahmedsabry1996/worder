export default{

          suggestPeople(context,data,rootState){
        axios.get('/api/timeline/suggest-people',{
            headers:{

            "Authorization" :`Bearer ${context.rootState.authentication.userToken}`

            }
        })
        .then((response)=>{

          let suggested = response.data.suggest_people;
          context.commit('suggestedPeople',suggested);
          context.commit('suggestFive');

        })
        .catch((errors)=>{
          console.log(errors);
          console.log(errors.response);
        })
      },



}
