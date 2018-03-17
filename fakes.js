var faker = require("faker");
for(var i = 0; i < 10; i++){
	console.log(faker.name.findName() + " is" + faker.hacker.adjective() + " whaaaaat??" + faker.internet.mac());
}
