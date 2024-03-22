import * as yup from "yup";
import { getRequiredSelectText, getRequiredText } from "../../utils/forms";

const passwordValidationRegExp =
  /^(?=.*[A-ZА-ЯЁ])(?=.*[a-zа-яё])(?=.*[\d\W]).*$/;
const fullNameValidationRegexp = /^(?=.*\S)[а-яА-ЯёЁ\s-]+$/;

export const authSchema = yup
  .object({
    email: yup
      .string()
      .email("Указан некорректный email")
      .required(getRequiredText("email")),
    password: yup.string().required(getRequiredText("пароль")),
  })
  .required();

export const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(
      fullNameValidationRegexp,
      "Отображаемое имя должно быть на русском языке",
    )
    .required(getRequiredText("ФИО")),
  email: yup
    .string()
    .email("Указан некорректный email")
    .required(getRequiredText("email")),
  password: yup
    .string()
    .required(getRequiredText("пароль"))
    .min(9, "Пароль должен содержать не менее 9 символов")
    .test(
      "password-validation",
      "Пароль должен состоять из заглавных и строчных букв, " +
        "содержать цифры или хотя бы один специальный символ или знак пунктуации",
      (value: string | undefined) => {
        return passwordValidationRegExp.test(value || "");
      },
    )
    .test(
      "passwords-match-username",
      "Пароль не должен совпадать с адресом электронной почты",
      (value, context) => {
        const { username } = context.parent;
        return value !== username;
      },
    ),
  repeatedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});

export const editAccountSchema = yup
  .object({
    full_name: yup
      .string()
      .matches(
        fullNameValidationRegexp,
        "Введите корректное ФИО на русском языке",
      )
      .required(getRequiredText("ФИО")),
    username: yup
      .string()
      .email("Указан некорректный email")
      .required(getRequiredText("email")),
  })
  .required();

export const requestPasswordResetSchema = yup
  .object({
    email: yup
      .string()
      .email("Указан некорректный email")
      .required(getRequiredText("email")),
  })
  .required();

export const resetPassword = yup
  .object({
    password: yup
      .string()
      .required(getRequiredText("новый пароль"))
      .min(9, "Пароль должен содержать не менее 9 символов")
      .test(
        "password-validation",
        "Пароль должен состоять из заглавных и строчных букв, " +
          "содержать цифры или хотя бы один специальный символ или знак пунктуации",
        (value: string | undefined) => {
          return passwordValidationRegExp.test(value || "");
        },
      ),
    repeated_password: yup
      .string()
      .required(getRequiredText("повтор пароля"))
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
  })
  .required();

export const createEventSchema = yup
  .object({
    title: yup
      .string()
      .required(getRequiredText("название"))
      .max(18, "18 символов - максимум"),
    description: yup
      .string()
      .max(55, "Для описания доступно не более 55 символов"),
  })
  .required();

export const addItemToListSchema = yup
  .object({
    title: yup.string().required(getRequiredText("хотя бы что-то")),
  })
  .required();

export const addDLAccountSchema = yup
  .object({
    login: yup
      .string()
      .email("Указан некорректный email")
      .required(getRequiredText("email")),
    password: yup.string().required(getRequiredText("пароль")),
  })
  .required();

export const createDeliveryRequestSchema = yup
  .object({
    sender: yup.object({
      phone: yup
        .string()
        .matches(/^\+7\d{10}$/, "Формат номера телефона: +7xxxxxxxxxx"),
      contact_person: yup
        .string()
        .trim()
        .required(getRequiredText("контактное лицо")),
    }),
    receiver: yup.object({
      name: yup.string().trim().required(getRequiredText("имя получателя")),
      contact: yup.string().trim().required(getRequiredText("контактное лицо")),
      phone: yup
        .string()
        .matches(/^\+7\d{10}$/, "Формат номера телефона: +7xxxxxxxxxx"),
    }),
    pickup: yup.object({
      address: yup
        .string()
        .trim()
        .required(getRequiredText("адрес забора или терминал")),
    }),
    delivery: yup.object({
      address: yup
        .string()
        .trim()
        .required(getRequiredText("адрес доставки или терминал")),
    }),
  })
  .required();

export const changePasswordSchema = yup
  .object({
    username: yup.string(),
    password: yup.string().required(getRequiredText("текущий пароль")),
    new_password: yup
      .string()
      .required(getRequiredText("новый пароль"))
      .min(9, "Пароль должен содержать не менее 9 символов")
      .test(
        "password-validation",
        "Пароль должен состоять из заглавных и строчных букв, " +
          "содержать цифры или хотя бы один специальный символ или знак пунктуации",
        (value: string | undefined) => {
          return passwordValidationRegExp.test(value || "");
        },
      )
      .test(
        "passwords-match",
        "Новый пароль не должен совпадать с текущим паролем",
        (value, context) => {
          const { password } = context.parent;
          return value !== password;
        },
      )
      .test(
        "passwords-match-username",
        "Новый пароль не должен совпадать с адресом электронной почты",
        (value, context) => {
          const { username } = context.parent;
          return value !== username;
        },
      ),
    repeated_password: yup
      .string()
      .required(getRequiredText("новый пароль"))
      .oneOf([yup.ref("new_password"), null], "Пароли должны совпадать"),
  })
  .required();

export const RESET_TOKEN_PARAM = "token";
