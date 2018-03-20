self.addEventListener('install', function(event){
    console.log('install');
})


self.addEventListener('fetch', function(event){
  console.log(event.request);
})
