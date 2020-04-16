const URL = "https://cfw-takehome.developers.workers.dev/api/variants";
const Cookie_name = "variant"
var random;


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});


var val;
async function handleRequest(request) 
{
  var randomUrl;
  const cookie = getCookie(request, Cookie_name);
  const response_data = await fetch(URL);
  const parse_data = await response_data.json();
  
  if(cookie == 0)
  {
    randomUrl = await fetch(parse_data.variants[cookie]);
  }
  else if(cookie == 1)
  {
    randomUrl = await fetch(parse_data.variants[cookie]);
  }
  else
  {
    random = Math.floor(Math.random()*(2));
    randomUrl = await fetch(parse_data.variants[random]);
    randomUrl = new Response(randomUrl.body, randomUrl);
    randomUrl.headers.append('Set-Cookie', `${Cookie_name}=${String(random)}; Path='/';`);
  }
  
    
   return rewrite(randomUrl, random); 
  

}

class WorkerTitle
{
  element(element)
  {
    element.setInnerContent("Welcome!!")
  }
}

class HeadTitle
{
  element(element)
  {
    element.setInnerContent("Bhakti Narvekar")
  }
}

class Description{
  constructor(random)
  {
    this.random = random;
  }

  element(element)
  {
    element.setInnerContent(`This is the submission for Summer Internship 2020 at Cloudflare. This is variant ${this.random}`);
  }
}

class Url{
  element(element)
  {
    element.setInnerContent("Connect with me on LinkedIn!!")
    element.setAttribute("href", "https://www.linkedin.com/in/bhakti-narvekar/");
  }
}

function getCookie(request, name)
{
  let result = null;
  let cookieString = request.headers.get("Cookie");
  if(cookieString)
  {
    let cookies = cookieString.split(";");
    cookies.forEach(c => {
      let cookieName = c.split("=")[0].trim();
      if(cookieName == name)
      {
        
        result = c.split("=")[1].trim();
      }
    });
  }
  return result;
}

async function rewrite(randomUrl, random)
{
  const rewriter = new HTMLRewriter()
  .on("title", new HeadTitle())
  .on("h1#title", new WorkerTitle())
  .on("p#description", new Description(random))
  .on("a#url", new Url());

  const rewriteResponse = await rewriter.transform(randomUrl);

  return rewriteResponse;
}