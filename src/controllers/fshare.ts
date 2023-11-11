import { HttpStatus } from '../enums';

export const home = () => {
  const html = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
        <title>Getlink Fshare</title>
    </head>
    <body>
        <a href="https://github.com/phd91105/fs-workers" class="github-corner" aria-label="View source on GitHub"><svg
                width="80" height="80" viewBox="0 0 250 250"
                style="fill:#64CEAA; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path
                    d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                    fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                <path
                    d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                    fill="currentColor" class="octo-body"></path>
            </svg></a>
        <form id="mainForm" class="container mt-5">
            <div id="fshareLogo" class="mb-3" alt="Fshare" style=" height: 50px; width: 143px; "> <!--?xml version="1.0" encoding="utf-8"?--> <!-- Generator: Adobe Illustrator 23.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1096 383" style="enable-background:new 0 0 1096 383;" xml:space="preserve"> <style type="text/css"> .st0{fill:#CD1417;} .st1{fill:#FFFFFF;} </style> <g> <g> <path class="st0" d="M202.68,56.92C106.82,59.48,66.59,76.6,66.59,191.5c0,114.9,40.23,132.02,136.09,134.59 c97.83,0,127.75-24.07,134.52-122.12c0.28-4.03,0.16-22.92-0.21-27.85C329.83,80.51,299.53,56.92,202.68,56.92z"></path> <path class="st1" d="M261.24,171.64c-0.23-19.75-16.3-35.7-36.12-35.7c-7.04,0-13.6,2.04-19.15,5.53 c-6.64-7.02-16.01-11.43-26.44-11.43c-20.09,0-36.38,16.29-36.38,36.38c0,1.77,0.16,3.49,0.41,5.17 c-19.73,3.06-34.86,20.08-34.86,40.67c0,22.76,18.45,41.21,41.21,41.21h104.69c22.75,0,41.2-18.45,41.2-41.21 C295.79,191.77,280.82,174.83,261.24,171.64z M230.29,196.9l-0.04,0.03c-0.05,0.42-0.24,0.8-0.57,1.06l-22.78,17.32 c-0.28,0.21-0.61,0.32-0.94,0.32c-0.08,0-0.15-0.04-0.23-0.05c-0.16-0.02-0.32-0.03-0.47-0.11c-0.25-0.12-0.46-0.31-0.61-0.54 c-0.16-0.25-0.26-0.54-0.26-0.86c0,0,0-4.32-0.01-9.37c-12.26-0.41-22.67,1.54-30.19,17.06c1.63-23.95,12.14-31.5,30.19-31.95 c0-0.55,0.01-0.87,0.01-0.87l0-9.5c0-0.31,0.1-0.6,0.26-0.85c0.15-0.23,0.36-0.42,0.61-0.54c0.05-0.03,0.11-0.02,0.17-0.04 c0.17-0.06,0.34-0.12,0.53-0.12c0.33,0,0.66,0.11,0.94,0.31l22.78,17.32c0.39,0.29,0.61,0.75,0.61,1.24 c0,0.04-0.03,0.08-0.03,0.12L230.29,196.9z"></path> </g> <g> <path class="st0" d="M409.62,114.83h95.27v26.86h-66.94v36.51h60.23v26.86h-60.23v60.02h-28.33V114.83z"></path> <path class="st0" d="M559.88,268.44c-6.71,0-12.7-0.84-17.94-2.52c-5.25-1.68-9.79-3.88-13.64-6.61c-3.85-2.73-7.1-5.88-9.76-9.44 c-2.66-3.57-4.69-7.17-6.09-10.81l24.55-10.49c2.38,5.32,5.56,9.27,9.55,11.86c3.99,2.59,8.43,3.88,13.32,3.88 c5.04,0,9.02-0.91,11.96-2.73c2.94-1.82,4.41-3.99,4.41-6.51c0-2.8-1.23-5.07-3.67-6.82c-2.45-1.75-6.68-3.32-12.7-4.72 l-14.48-3.15c-3.22-0.7-6.54-1.82-9.97-3.36c-3.43-1.54-6.54-3.5-9.34-5.88c-2.8-2.38-5.11-5.25-6.92-8.6 c-1.82-3.36-2.73-7.27-2.73-11.75c0-5.04,1.08-9.51,3.25-13.43c2.17-3.92,5.14-7.24,8.92-9.97c3.78-2.73,8.22-4.83,13.33-6.3 c5.11-1.47,10.6-2.2,16.47-2.2c9.79,0,18.54,1.92,26.23,5.77c7.69,3.85,13.36,9.97,17,18.36l-23.71,9.65 c-1.96-4.06-4.83-6.99-8.6-8.81c-3.78-1.82-7.55-2.73-11.33-2.73c-3.92,0-7.34,0.81-10.28,2.41c-2.94,1.61-4.41,3.67-4.41,6.19 c0,2.38,1.22,4.27,3.67,5.67c2.45,1.4,5.77,2.66,9.97,3.78l15.74,3.78c10.49,2.52,18.29,6.54,23.4,12.07 c5.11,5.53,7.66,12.07,7.66,19.62c0,4.48-1.05,8.75-3.15,12.8c-2.1,4.06-5.07,7.66-8.92,10.81c-3.85,3.15-8.47,5.63-13.85,7.45 C572.43,267.53,566.45,268.44,559.88,268.44z"></path> <path class="st0" d="M620.52,114.83h27.49v42.18l-1.68,18.68h1.68c2.94-4.9,7.17-8.92,12.7-12.07c5.52-3.15,11.71-4.72,18.57-4.72 c13.29,0,23.12,3.92,29.48,11.75c6.37,7.84,9.55,18.54,9.55,32.11v62.33h-27.49v-58.97c0-7.13-1.68-12.55-5.04-16.26 c-3.36-3.71-8.05-5.56-14.06-5.56c-3.78,0-7.13,0.81-10.07,2.41c-2.94,1.61-5.42,3.81-7.45,6.61c-2.03,2.8-3.57,6.05-4.62,9.76 c-1.05,3.71-1.57,7.66-1.57,11.86v50.15h-27.49V114.83z"></path> <path class="st0" d="M803.3,254.17h-1.68c-3.22,3.92-7.1,7.28-11.65,10.07c-4.55,2.8-10.39,4.2-17.52,4.2 c-5.32,0-10.32-0.88-15-2.62c-4.69-1.75-8.78-4.16-12.28-7.24c-3.5-3.08-6.23-6.78-8.19-11.12c-1.96-4.33-2.94-9.09-2.94-14.27 c0-5.32,1.05-10.11,3.15-14.38c2.1-4.27,5.04-7.94,8.81-11.02c3.78-3.08,8.22-5.42,13.33-7.03c5.11-1.61,10.67-2.41,16.68-2.41 c6.71,0,12.24,0.52,16.58,1.57c4.33,1.05,7.9,2.13,10.7,3.25v-3.15c0-5.46-2.17-9.97-6.51-13.54c-4.34-3.57-9.72-5.35-16.16-5.35 c-9.52,0-17.56,3.99-24.13,11.96l-19.94-13.64c10.91-13.71,25.81-20.57,44.7-20.57c15.95,0,28.12,3.74,36.51,11.23 c8.39,7.49,12.59,18.57,12.59,33.26v61.7H803.3V254.17z M803.3,223.32c-3.22-1.54-6.54-2.76-9.97-3.67 c-3.43-0.91-7.17-1.36-11.23-1.36c-6.58,0-11.65,1.44-15.21,4.3c-3.57,2.87-5.35,6.4-5.35,10.6s1.71,7.55,5.14,10.07 c3.43,2.52,7.38,3.78,11.86,3.78c3.64,0,6.99-0.66,10.07-1.99c3.07-1.33,5.7-3.08,7.87-5.25c2.17-2.17,3.85-4.69,5.04-7.55 C802.71,229.37,803.3,226.4,803.3,223.32z"></path> <path class="st0" d="M852.2,162.25h25.81v14.27h1.68c1.26-2.52,2.94-4.83,5.04-6.92c2.1-2.1,4.44-3.92,7.03-5.49 c2.59-1.56,5.38-2.82,8.39-3.78c3.01-0.96,5.98-1.44,8.92-1.44c3.64,0,6.75,0.39,9.34,1.17c2.59,0.78,4.79,1.79,6.61,3.03 l-7.34,24.55c-1.68-0.84-3.54-1.5-5.56-1.99c-2.03-0.49-4.51-0.73-7.45-0.73c-3.78,0-7.21,0.74-10.28,2.22 c-3.08,1.47-5.7,3.55-7.87,6.22c-2.17,2.67-3.85,5.8-5.04,9.39c-1.19,3.59-1.79,7.49-1.79,11.71v50.63H852.2V162.25z"></path> <path class="st0" d="M1028.68,240.32c-4.76,8.39-11.16,15.18-19.2,20.36c-8.05,5.17-17.88,7.76-29.48,7.76 c-7.84,0-15.08-1.36-21.72-4.09c-6.65-2.73-12.42-6.54-17.31-11.44c-4.9-4.89-8.71-10.67-11.44-17.31 c-2.73-6.64-4.09-13.96-4.09-21.93c0-7.41,1.33-14.44,3.99-21.09c2.65-6.64,6.36-12.45,11.12-17.42 c4.75-4.96,10.39-8.92,16.89-11.86c6.51-2.94,13.67-4.41,21.51-4.41c8.25,0,15.6,1.36,22.04,4.09 c6.43,2.73,11.82,6.51,16.16,11.33c4.34,4.83,7.62,10.53,9.86,17.1c2.24,6.58,3.36,13.71,3.36,21.41c0,0.98,0,1.82,0,2.52 c-0.14,0.84-0.21,1.61-0.21,2.31c-0.14,0.7-0.21,1.47-0.21,2.31h-77.44c0.56,4.2,1.71,7.8,3.46,10.81 c1.75,3.01,3.92,5.53,6.51,7.55c2.59,2.03,5.42,3.5,8.5,4.41c3.07,0.91,6.22,1.36,9.44,1.36c6.29,0,11.5-1.43,15.63-4.3 c4.13-2.87,7.38-6.47,9.76-10.81L1028.68,240.32z M1003.71,200.45c-0.14-1.82-0.73-3.85-1.78-6.08c-1.05-2.24-2.59-4.33-4.62-6.3 c-2.03-1.96-4.55-3.57-7.55-4.83c-3.01-1.26-6.61-1.89-10.81-1.89c-5.88,0-11.05,1.68-15.53,5.04c-4.48,3.36-7.63,8.05-9.44,14.06 H1003.71z"></path> </g> </g> </svg> </div>
            <div class="form-group">
                <label>Fshare Link <span class="text-danger">*</span></label>
                <input name="original" id="original" type="text" class="form-control"
                    placeholder="https://www.fshare.vn/file/XXXXX">
            </div>
            <div class="form-group">
                <label>File password</label>
                <input id="password" type="text" class="form-control" placeholder="Password">
            </div>
            <div class="form-group" id="itemList"></div>
            <div class="form-group">
                <label id="fileName" for="generated">Generated Link</label>
                <input id="generated" type="text" class="form-control" readonly>
            </div>
            <div class="form-group">
            </div>
            <button type="submit" id="create" class="btn btn-primary mt-2">Get Link</button>
            <button type="button" id="search" class="btn btn-secondary mt-2" data-toggle="modal"
                data-target="#staticBackdrop">FilmSearch</button>
            <button type="button" id="google" class="btn btn-info mt-2" data-toggle="modal"
                data-target="#googleSearch">GoogleSearch</button>
            <button type="button" id="copy" class="action-btn js-textareacopybtn btn btn-success mt-2" data-id="generated"
                disabled="disabled">Copy</button>
            <button type="button" id="download" class="action-btn btn btn-danger mt-2" disabled="disabled">Download</button>
            <button type="button" id="useProxy" class="action-btn btn btn-info mt-2" disabled="disabled">Use
                Proxy</button>
            <button type="button" id="openInVLC" class="action-btn btn btn-warning mt-2" disabled="disabled">Open in
                VLC</button>
        </form>
    </body>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <form id="filmSearchForm">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Film</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="form-group">
                                <input name="filmName" id="filmName" type="text" class="form-control"
                                    placeholder="Search...">
                            </div>
                            <div id="searchData" class="table-responsive"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" id="filmSearch">Search</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="googleSearch" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <form id="ggSearchForm">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Search</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="form-group">
                                <input name="ggQuery" id="ggQuery" type="text" class="form-control" placeholder="Search...">
                            </div>
                            <div id="ggSearchData" class="table-responsive"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" id="ggSearch">Search</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <style>
    label.error {
        color: #f64e60 !important;
        font-size: 0.8rem !important;
        font-weight: bold !important;
      }
      
      .github-corner:hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
      }
      
      @keyframes octocat-wave {
        0%,
        100% {
          transform: rotate(0);
        }
      
        20%,
        60% {
          transform: rotate(-25deg);
        }
      
        40%,
        80% {
          transform: rotate(10deg);
        }
      }
      
      @media (max-width: 500px) {
        .github-corner:hover .octo-arm {
          animation: none;
        }
      
        .github-corner .octo-arm {
          animation: octocat-wave 560ms ease-in-out;
        }
      }
    </style>
    <script>
    const fshareFileRegex = /(https?:\\/\\/)?(www\\.)?fshare\\.vn\\/file\\/.+/;
    const fshareFolderRegex = /(https?:\\/\\/)?(www\\.)?fshare\\.vn\\/folder\\/.+/;
  
    $(document).ready(function () {
      $.fn.main.formValidation();
      $.fn.main.registerEvent();
    });
  
    $.fn.extend({
      element: {
        mainForm: "#mainForm",
        modalFilmSearch: "#filmSearchForm",
        modalggSearch: "#ggSearchForm"
      },
      main: {
        formValidation: function () {
          $.validator.addMethod("isFsLink", function (value, element) {
            return this.optional(element) || fshareFileRegex.test(value) || fshareFolderRegex.test(value);
          }, "Invalid format.");
  
          $($.fn.element.mainForm).validate({
            onfocusout: function (element) {
              $(element).valid();
            },
            rules: {
              original: {
                required: true,
                isFsLink: true
              }
            },
            errorClass: "error is-invalid"
          });
  
          $($.fn.element.modalFilmSearch).validate({
            onfocusout: function (element) {
              $(element).valid();
            },
            rules: {
              filmName: {
                required: true
              }
            },
            errorClass: "error is-invalid"
          });
  
          $($.fn.element.modalggSearch).validate({
            onfocusout: function (element) {
              $(element).valid();
            },
            rules: {
              ggQuery: {
                required: true
              }
            },
            errorClass: "error is-invalid"
          });
        },
        registerEvent: function () {
          $(document).on("change", "#original, #password", function (e) {
            e.preventDefault();
            $("#mainForm").valid();
            $("#create").removeAttr("disabled");
            $("#fileName").html("Generated Link");
          });
  
          $("#download").on("click", function (e) {
            e.preventDefault();
            document.location.href = $("#generated").val();
          });
  
          $("#useProxy").on("click", function (e) {
            e.preventDefault();
            const $generated = $("#generated");
            $generated.val(\`https://proxy.phd051199.workers.dev/api/download?url=\${encodeURIComponent($generated.val())}\`);
          });
  
          $("#openInVLC").on("click", function (e) {
            e.preventDefault();
            document.location.href = \`vlc://\${$("#generated").val()}\`;
          });
  
          $("#create").on("click", function (e) {
            if (e.preventDefault(), !$("#mainForm").valid()) return;
  
            const originalUrl = $("#original").val();
            const fileId = originalUrl.split("?")[0].split("/").pop();
            const apiUrl = \`https://www.fshare.vn/\${fshareFileRegex.test(originalUrl) ? "file" : "folder"}/\${fileId}\`;
            const password = $("#password").val();
            const $createBtn = $(this);
  
            if ($.fn.main.showLoading($createBtn), fshareFileRegex.test(apiUrl)) {
              $.ajax({
                url: "/fshare/getFile",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ url: apiUrl, password: password }),
                success: function (response) {
                  if ($.fn.main.hideLoading($createBtn, "Get Link"), !response.location) {
                    $(".action-btn").prop("disabled", "disabled");
                    let errorMsg = "";
                    switch (response.code) {
                      case 123:
                        errorMsg = "Invalid file password!";
                        break;
                      case 404:
                        errorMsg = "File not found!";
                        break;
                      default:
                        errorMsg = "Something went wrong!";
                    }
                    return $("#generated").val(errorMsg);
                  }
    
                  $("#generated").val(response.location.replace("http://", "https://"));
                  $("#fileName").html(\`File name: <span class='text-success'>\${decodeURI($("#generated").val().split("/").pop())}</span>\`);
                  $(".action-btn").removeAttr("disabled");
                },
              });
            } else if (fshareFolderRegex.test(apiUrl)) {
              const folderCode = apiUrl.split("?")[0].split("/").pop();
              $.ajax({
                url: "/fshare/getFolder",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ code: folderCode }),
                success: function (response) {
                  $.fn.main.hideLoading($createBtn, "Get Link");
                  let itemListHtml = \`<label>Folder name: <span class='text-success'>\${response.current.name}</span></label><select class="form-control" id="files">\`;
                  for (let i = 0; i < response.items.length; i++) {
                    const itemType = response.items[i].mimetype ? "file" : "folder";
                    itemListHtml += \`<option value="https://www.fshare.vn/\${itemType}/\${response.items[i].linkcode}">\${response.items[i].name}</option>\`;
                  }
                  itemListHtml += "</select>";
                  $("#itemList").html(itemListHtml);
    
                  $("#files").on("change click", function (e) {
                    e.preventDefault();
                    const selectedFileUrl = $(this).find(":selected").val();
                    $("#original").val(selectedFileUrl).trigger("change");
                  });
                }
              });
            }
          });
  
          $(".js-textareacopybtn").on("click", function (e) {
            e.preventDefault();
            const generatedLink = $("#generated").val();
            navigator.clipboard.writeText(generatedLink);
          });
  
          $("#filmSearch").on("click", function (e) {
            if (e.preventDefault(), !$("#filmSearchForm").valid()) return;
  
            const filmName = $("#filmName").val();
            const $filmSearchBtn = $(this);
  
            $.fn.main.showLoading($filmSearchBtn);
            $.ajax({
              url: "/film/search",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({ filmName: filmName }),
              success: function (response) {
                if ($.fn.main.hideLoading($filmSearchBtn), response.status === "false") {
                  return void $("#searchData").html('<label class="error is-invalid">No result.</label>');
                }
                let tableHtml = '<table class="table table-hover table-sm">\\n<thead class="thead-dark">\\n<tr>\\n<th scope="col">ID</th>\\n<th scope="col">Image</th>\\n<th scope="col">Name</th>\\n<th scope="col"></th>\\n</tr>\\n</thead>\\n<tbody>';
                for (let i = 0; i < response.data.length; i++) {
                  const item = response.data[i];
                  tableHtml += \`<tr>\\n<th scope="row">\${i + 1}</th>\\n<td>\\n<img width="100" src="\${item.image}">\\n</td>\\n<td>\${item.title}</td>\\n<td>\\n<div class="btn-group">\\n<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select</button>\\n<div class="dropdown-menu">\`;
                  for (let j = 0; j < item.links.length; j++) {
                    const link = item.links[j];
                    tableHtml += \`<a class="dropdown-item" data-link="\${link.link}">\${link.title}</a>\`;
                  }
                  tableHtml += "</div></div></td></tr>";
                }
                tableHtml += "</tbody></table>";
            
                $("#searchData").html(tableHtml);
            
                $(".dropdown-item").on("click", function () {
                  $("#original").val($(this).data("link")).trigger("change");
                  $("#staticBackdrop").modal("hide");
                });
              }
            });            
          });
  
          $("#ggSearch").on("click", function (e) {
            e.preventDefault();
  
            const query = $("#ggQuery").val();
            const $ggSearchBtn = $(this);
  
            if (!$("#ggSearchForm").valid()) return;
  
            $.fn.main.showLoading($ggSearchBtn);
            $.ajax({
              url: "/google/customSearch",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({ keyword: query }),
              success: function (response) {
                if ($.fn.main.hideLoading($ggSearchBtn), response.length === 0) {
                  return void $("#ggSearchData").html('<label class="error is-invalid">No result.</label>');
                }
    
                let ggTableHtml = '<table class="table table-hover table-sm">\\n<thead class="thead-dark">\\n<tr>\\n<th scope="col">ID</th>\\n<th scope="col">Type</th>\\n<th scope="col">Name</th>\\n<th scope="col"></th>\\n</tr>\\n</thead>\\n<tbody>';
                for (let i = 0; i < response.length; i++) {
                  const ggItem = response[i];
                  ggTableHtml += \`<tr>\\n<th scope="row">\${i + 1}</th>\\n<td>\${ggItem.link.includes("folder") ? "Folder" : "File"}</td>\\n<td>\${ggItem.htmlTitle}</td>\\n<td>\\n<div class="btn-group">\\n<button type="button" class="btn btn-success search-items" data-link="\${ggItem.link}" aria-haspopup="true" aria-expanded="false">Select</button>\\n</div>\\n</td>\\n</tr>\`;
                }
                ggTableHtml += "</tbody></table>";
    
                $("#ggSearchData").html(ggTableHtml);
    
                $(".search-items").on("click", function () {
                  $("#original").val($(this).data("link")).trigger("change");
                  $("#googleSearch").modal("hide");
                });
              }
            });
          });
        },
        showLoading: function ($element) {
          $element.html("<span class='spinner-border spinner-border-sm ml-4 mr-4' role='status' aria-hidden='true'></span>").attr("disabled", true);
        },
        hideLoading: function ($element, text = "Search") {
          $element.html(text).removeAttr("disabled");
        }
      }
    });
    </script>
    </html>`;

  return new Response(html, {
    status: HttpStatus.OK,
    headers: {
      'content-type': 'text/html',
    },
  });
};
