import  {newTrend} from './../../../auth.js';

const TREND = newTrend();

export default{
  topTen:TREND,
  trendOffset:27,
  trendPostsNum:0,
  trendLoadedPosts:0,
  trendPosts:[],

}
