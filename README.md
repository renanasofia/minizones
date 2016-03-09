// Set "name" attribute on current zone
zone.set("name","Test0");

// Fork into a new zone
zone.fork(function() {
  // This runs in new zone, all attributes are zone specific
  zone.set("name", "Test1");
  
  // Async operations also run in the correct zone
  setTimeout(function() {
    // This will run in the same zone as the forked function
    console.log("test setTimeout", zone.get("name") == "Test1");
  }, 1000);
  
  console.log("test fork", zone.get("name") == "Test1");
})

console.log("test global zone", zone.get("name") == "Test0");
