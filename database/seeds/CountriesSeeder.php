<?php

use Illuminate\Database\Seeder;
use App\Country as country;
class CountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // country::create(['country'=>'Algeria','locale'=>'ar']);
        // country::create(['country'=>'Bahrain','locale'=>'ar']);
        // country::create(['country'=>'Chad','locale'=>'ar']);
        // country::create(['country'=>'Comoros ','locale'=>'ar']);
        // country::create(['country'=>'Djibouti','locale'=>'ar']);
        // country::create(['country'=>'Egypt','locale'=>'ar']);
        // country::create(['country'=>'Eritrea','locale'=>'ar']);
        // country::create(['country'=>'Iraq','locale'=>'ar']);
        // country::create(['country'=>'Jordan','locale'=>'ar']);
        // country::create(['country'=>'Kuwait','locale'=>'ar']);
        // country::create(['country'=>'Lebanon ','locale'=>'ar']);
        // country::create(['country'=>'Libya','locale'=>'ar']);
        // country::create(['country'=>'Mauritania','locale'=>'ar']);
        // country::create(['country'=>'Morocco','locale'=>'ar']);
        // country::create(['country'=>'Oman ','locale'=>'ar']);
        // country::create(['country'=>'Palestine','locale'=>'ar']);
        // country::create(['country'=>'Qatar','locale'=>'ar']);
        // country::create(['country'=>'Saudi Arabia ','locale'=>'ar']);
        // country::create(['country'=>'Somalia','locale'=>'ar']);
        // country::create(['country'=>'Sudan','locale'=>'ar']);
        // country::create(['country'=>'Syria','locale'=>'ar']);
        // country::create(['country'=>'Tunisia ','locale'=>'ar']);
        // country::create(['country'=>'United Arab Emirates  ','locale'=>'ar']);
        // country::create(['country'=>'Yemen ','locale'=>'ar']);
        //

         $countries = array("Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe");
         foreach ($countries as $country ) {
           if (country::where('country',$country)->exists() == null) {

                 country::create(['country'=>$country,'locale'=>'en']);
           }
        }
    }
}
