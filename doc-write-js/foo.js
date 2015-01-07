foo = 2000

console.log("START foo.js. assign foo to " + foo)

document.write('<script>console.log("BBBBBBBBBB: ", foo)<\/script>')

document.write("<script src=bar.js><\/script>")

document.write('<script src="http://1.cuzillion.com/bin/resource.cgi?type=js&sleep=2&n=1"><\/script>')

console.log("END foo.js")
