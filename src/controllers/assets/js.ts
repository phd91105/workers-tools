export const js = () => {
  const js = `
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
        autocomplete: function () {
          $("#filmName").autoComplete({
            resolver: "ajax",
            resolverSettings: {
              url: "/api/ac",
              queryKey: "keyword",
              requestThrottling: 300
            }
          });
        },
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
              }});
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
            $.post("/google/search", { q: query }, function (response) {
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
    });`;

  return new Response(js, {
    headers: {
      'content-type': 'text/script',
    },
  });
};
