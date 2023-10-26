"use strict"


const header = document.querySelector(".header")
const body = document.body



//Действия по скроллу------------
const arrowBottom = document.querySelector(".intro__btn")


window.addEventListener("scroll", () => {
  scrollY >= 200
    ? header.classList.add("scroll")
    : header.classList.remove("scroll")
   scrollY >= 100 ? arrowBottom.style.display = 'none' : arrowBottom.style.display = 'block'
})

arrowBottom.addEventListener('click', (e) => {
    e.preventDefault()
    window.scrollBy(0, window.innerHeight);
})




//Формы обратной связи----------------------------------------


//Получение узлов формы-фриланс
const freelanceButton = document.querySelector(".freelance-btn")
const formFreelanceUp = document.querySelector(".form-freelance")
const freelanceFormClose = document.querySelector(".form-freelance__close")
//Получение узлов формы-работа
const jobButton = document.querySelector(".job-btn")
const formJobUp = document.querySelector(".form-job")
const jobFormClose = document.querySelector(".form-job__close")

//Объявляю функции вызова форм
function freelanceFormAction() {
  formFreelanceUp.classList.toggle("form-up")
  body.classList.toggle("hidden")
}
function jobFormAction() {
  formJobUp.classList.toggle("form-up")
  body.classList.toggle("hidden")
}

//Вызываю и убираю формы по кликам на кнопки
freelanceButton.addEventListener("click", freelanceFormAction)
jobButton.addEventListener("click", jobFormAction)

freelanceFormClose.addEventListener("click", freelanceFormAction)
jobFormClose.addEventListener("click", jobFormAction)

//Закрытие формы при клике за ее границами
window.addEventListener("click", (e) => {
  let target = e.target

  if (target.classList.contains("form-freelance")) {
    freelanceFormAction()
  }
  if (target.classList.contains("form-job")) {
    jobFormAction()
  }
})

//Валидация форм и отправка через php-Mailer
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#freelance-form")
  const form2 = document.querySelector("#job-form")

  async function formSend(e) {
    e.preventDefault()

    let error = formValidateFreelance()

    let formData = new FormData(form)

    if (error === 0) {
      form.classList.add("_sending")
      let response = await fetch("sendmail-freelance.php", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        let result = await response.json()
        alert('Ваше сообщение отправлено')
        form.reset()
        form.classList.remove("_sending")
        freelanceFormAction()
      } else {
        alert("Ошибка!")
        form.classList.remove("_sending")
      }
    } else {
      alert("Ошибка! Неправильно заполненное поле.")
    }
  }
  async function formSend2(e) {
   e.preventDefault()

   let error = formValidateJob()

   let formData = new FormData(form2)

   if (error === 0) {
     form2.classList.add("_sending")
     let response = await fetch("sendmail-job.php", {
       method: "POST",
       body: formData,
     })

     if (response.ok) {
       let result = await response.json()
       alert('Ваше сообщение отправлено')
       form2.reset()
       form2.classList.remove("_sending")
       jobFormAction()
     } else {
       alert("Ошибка!")
       form2.classList.remove("_sending")
     }
   } else {
     alert("Ошибка! Неправильно заполненное поле.")
   }
 }

  form.addEventListener("submit", formSend)
  form2.addEventListener("submit", formSend2)

  function formValidateFreelance() {
    let error = 0
    let formReq = document.querySelectorAll("._req-freelance")

    for (let i = 0; i < formReq.length; i++) {
      let input = formReq[i]
      inputRemoveError(input)

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          inputAddError(input)
          error++
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        inputAddError(input)
        error++
      } else {
        if (input.value === "") {
          inputAddError(input)
          error++
        }
      }

      input.addEventListener("focus", (e) => {
        if (
          e.target.classList.contains("_error") ||
          e.target.previousElementSibling.classList.contains("_error")
        ) {
          inputRemoveError(input)
        }
      })
    }

    function inputAddError(input) {
      input.classList.add("_error")
    }

    function inputRemoveError(input) {
      input.classList.remove("_error")
    }

    function emailTest(input) {
      return !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }

    return error
  }
  function formValidateJob() {
    let error = 0
    let formReq = document.querySelectorAll("._req-job")

    for (let i = 0; i < formReq.length; i++) {
      let input = formReq[i]
      inputRemoveError(input)

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          inputAddError(input)
          error++
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        inputAddError(input)
        error++
      } else {
        if (input.value === "") {
          inputAddError(input)
          error++
        }
      }

      input.addEventListener("focus", (e) => {
        if (
          e.target.classList.contains("_error") ||
          e.target.previousElementSibling.classList.contains("_error")
        ) {
          inputRemoveError(input)
        }
      })
    }

    function inputAddError(input) {
      input.classList.add("_error")
    }

    function inputRemoveError(input) {
      input.classList.remove("_error")
    }

    function emailTest(input) {
      return !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }

    return error
  }
})
