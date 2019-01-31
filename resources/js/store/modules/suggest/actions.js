export default{

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
