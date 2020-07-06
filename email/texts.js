const {APP_NAME} = require('../config/api');

module.exports = {

signUpText: (data) => {
    return `
        <style>
        .box {
        padding: 10px 10%;
      }

      .header {
        text-align: center;
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 5%;
      }

      .devider {
        border: 1px solid #00A6CB;
      }

      .text {
        font-size: 1.2rem;
        margin-bottom: 5%;
        line-height: 1.5rem;
      }
      </style>
      <div class="box">
        <hr class="devider" />
        <h1 class="header">Вы успешно зарегистрировались на сайте ${APP_NAME}.</h1>
        <p class="text">
          Теперь Вы можете вести учет своих финансов и работать со своим списком пожеланий.
          <br>
          <br>
          Ваш логин: ${data.email}
          <br>
          Ваш пароль: ${data.password}
        </p>
        <hr class="devider" />
      </div>
    `;
  }
}
