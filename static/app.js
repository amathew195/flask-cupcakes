"use strict";

const $cupcakesList = $("#cupcakes");
const $form = $("#addcupcakeform");
const $addButton = $("#addButton");
const $flavor = $("#flavor");
const $size = $("#size");
const $rating = $("#rating");
const $image = $("#image");

async function loadCupcakeList() {
  const response = await axios.get("/api/cupcakes");
  const cupcakes = response.data.cupcakes;
  for (const cupcake of cupcakes) {
    $cupcakesList.append(`<li>${cupcake.flavor}</li>`);
  }
}

loadCupcakeList()
$addButton.on("click",addNewCupcake)

async function addNewCupcake(evt){
  evt.preventDefault();
  const flavor = $flavor.val();
  const size = $size.val();
  const rating = $rating.val();
  const image = $image.val();
  // const newFlavor = await updateCupcakeList(flavor,size,rating,image);
  // $cupcakesList.append(`<li>${newFlavor}</li>`)

}
async function updateCupcakeList(flavor,size,rating,image){
  // const data = {"flavor":flavor,"size":size,"rating":rating,"image":image}
  const response = await axios.post(
      "/api/cupcakes",
      {"flavor":flavor,"size":size,"rating":rating,"image":image}
  )
  console.log(response.data.cupcake.flavor)
  return response.data.cupcake.flavor
}
