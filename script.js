

let upload_logo, logo, print_to_pdf
window.jsPDF = window.jspdf.jsPDF;

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

addEventListener("DOMContentLoaded", function(){
    upload_logo = this.document.getElementById("logo_input")
    print_to_pdf = this.document.getElementById("print_pdf")
    logo_button = this.document.getElementById("logo_upload")
    logo = this.document.getElementById("logo")
    body = this.document.getElementById("container")


    if (this.localStorage.getItem("logo") != undefined){
        logo.src = this.localStorage.getItem("logo")
        logo.style.opacity = 1
        logo_button.style.backgroundColor = "white"
    }

    upload_logo.onchange = async () => {
        const file = upload_logo.files[0];
        try {
            const result = await toBase64(file);
            console.log("Base64: " + result)
            logo.src = result
            logo.style.opacity = 1
            logo_button.style.backgroundColor = "white"
            this.localStorage.setItem("logo", result)
            return;
        } catch(error) {
            console.error(error);
            return;
        }
    }

    $('#print_pdf').on("click", function(){
        $('.ignorePDF').hide()
        const pdf = new jsPDF('p', 'pt', [700, 900]);
        pdf.html(document.getElementById('container'), {
        callback: function () {
              pdf.setFont('HankenGrotesk-Medium', 'normal');
              pdf.setFont('HankenGrotesk-Bold', 'normal');
              pdf.setFont('HankenGrotesk-Black', 'normal');
              pdf.setFont('HankenGrotesk-Regular', 'normal');
              pdf.setFont('HankenGrotesk-Thin', 'normal');
              pdf.setFont('HankenGrotesk-Light', 'normal');
              pdf.save('invoice_' + Date.now() + '.pdf');
              $('.ignorePDF').show()
            }
        });
    })

    $('#clear').on("click", function(){
        localStorage.clear()
        location.reload()
    })

    $(".inputs").each(function(){
        if (localStorage.getItem(this.id)) {
            this.innerText = localStorage.getItem(this.id)
        }

        let shouldFireChange = false;
        this.addEventListener("input", function() {
            shouldFireChange = true;
        });
        this.addEventListener("focusout", function() {
            if(shouldFireChange) {
                shouldFireChange = false;
                localStorage.setItem(this.id, this.innerText)
            }
        });
    })
})