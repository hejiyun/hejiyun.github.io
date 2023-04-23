import xhr from "./xhr";
export function POST(url,search,headers) {
  const data = {data: search}
  return xhr({ url, data, method:'post',headers})
}
export function GET(url,search,headers) {
  const data = {params: search}
  return xhr({ url, data, method:'get',headers});
}
export function UPFILE(url, search, headers) {
  const data = search;
  !headers && (headers={})
  headers["request-type"] = "file";
  return xhr({ url, data, method: "post", headers });
}
export function PICUPLOAD(url,search,headers) {
  const data =  search
  headers['request-type'] = 'file'
  return xhr({ url, data, method:'post',headers});
}
