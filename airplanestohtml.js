/**
 * Created by maryna-yelakova on 08.08.16.
 *
var flightsArray = [{id:0,groups:[{id:0,number:7,height:2500},{id:5,number:9,height:3000}]},
    {id:1,groups:[{id:4,number:2,height:2500},{id:7,number:5,height:4000}]}]; */
$(document).ready(function(){
    $(".count").click(function() {
            $(".output_div").append("<table class='output_table'><tr><td>Номер вылета</td><td>Количество человек</td><td>Высота</td><td>Количество групп</td></tr></table></td></tr>");
    })
});