import React, {Component} from 'react';
import './Help.css'
import {Image} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

class Help extends Component{
    render() {
        // eslint-disable-next-line
        return(
            <div className='help'>
                <div className='float-right nav-div'>
                    <Nav fill className="align-content-around position-fixed">
                        <Nav.Item>
                            <Nav.Link href="#auth">Вход</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#register">Регистрация</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#pages">Страницы</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#otchets">Отчёты</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <h1 className='text-md-center'>Руководство пользователя сайтом</h1>
                <div id="auth">
                    <h1 className='text-md-left'><a name="auth" href='#auth'>Вход</a></h1>
                    <p>
                        Для того, чтобы получить полные возможности сайта,
                        необходимо совершить вход в систему посредством авторизации на странице http://localhost:3000/Auth.
                        Попасть на неё вы можете через главную страницу, просто нажав по ссылке «Войти» в правом верхнем углу экрана
                    </p>
                    <Image src='/images/Auth/Auth.jpg' width='1000' rounded/>
                    <p>
                        На форме будет предложено ввести свой логин и пароль в соответствующие поля формы.
                        Поле логина должно содержать 5-20 символов, которыми могут быть буквы и цифры, первый символ обязательно буква.
                        Поле пароля должно содержать строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов, требует ввода личного пароля пользователя для его
                        дальнейшей аутентификации в системе..
                        После ввода персональных данных необходимо нажать на кнопку «Отправить» и, в случае ввода корректных данных пользователь получает доступ к основным функциям системы, в противном случае на форму будет выдано предупреждение: «Неверно указан логин или пароль!».
                        <h2>
                            Пример авторизации пользователя
                        </h2>
                        <ol>
                            <li>
                                Указываем логин в соответствующем поле
                                <Image src='/images/Auth/Auth_login.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Указываем пароль в соответствующем поле
                                <Image src='/images/Auth/Auth_password.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Нажимаем на кнопку "отправить" и в случае успешной авторизации попадаем на страницу "Услуги"
                                <Image src='/images/Auth/Auth_res.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                В случае не успешной авторизации на форме увидим следующее сообщение
                                <Image src='/images/Auth/Auth_err.jpg' width='1000' rounded/>
                            </li>
                        </ol>

                    </p>
                </div>
                <div id="register">
                    <h1 className='text-md-left'><a name='register' href='#register'>Регистрация</a></h1>
                    <p>
                        Для того, чтобы попасть на сайт и получить доступ ко всем его услугам,
                        необходимо совершить вход в систему, в случае если нет аккаунта, требуется регистрация на странице http://localhost:3000/Register.
                        Попасть на неё вы можете через страницу авторизации, просто нажав по ссылке «Нет аккаунта? Зарегистрируйтесь :)» в нижней части формы.
                        <p className='text-danger'>
                            ВАЖНО!!! Для полного использования сайта обратитесь к администрации сайта, для выдачи прав.
                        </p>
                    </p>
                    <Image src='/images/Register/Register.jpg' width='1000' rounded/>
                    <p>
                        На форме будет предложено ввести свой логин и пароль, а также Фамилию, Имя, Отчество в соответствующие поля формы.
                        Поле логина должно содержать 5-20 символов, которыми могут быть буквы и цифры, первый символ обязательно буква.
                        Поле пароля должно содержать строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов, требует ввода личного пароля пользователя для его
                        дальнейшей аутентификации в системе..
                        После ввода персональных данных необходимо нажать на кнопку «Отправить» и, в случае ввода корректных данных пользователь получает доступ к основным функциям системы, в противном случае на форму будет выдано предупреждения

                        <h2>
                            Пример регистрации пользователя
                        </h2>
                        <ol>
                            <li>
                                Указываем фамилию в соответствующем поле
                                <Image src='/images/Register/Register_famil.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Указываем имя в соответствующем поле
                                <Image src='/images/Register/Register_name.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Указываем отчество в соответствующем поле
                                <Image src='/images/Register/Register_otchestvo.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Указываем логин в соответствующем поле
                                <Image src='/images/Register/Register_login.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Указываем пароль в соответствующем поле
                                <Image src='/images/Register/Register_password.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Нажимаем на отправить и в случае успешной регистрации попадаем на страницу входа
                                <Image src='/images/Register/Register_res.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                В случае неудачной регистрации на форме увидим сообщения
                                <Image src='/images/Register/Register_err.jpg' width='1000' rounded/>
                            </li>
                        </ol>

                    </p>
                </div>
                <div id="pages">
                    <h1 className='text-md-left'><a name="pages" href='#pages'>Страницы</a></h1>
                    <p>
                        Для того, чтобы попасть на страницу к примеру "Мои услуги"
                        и получить доступ ко всем его функциям,
                        необходимо перейти на данную страницу http://localhost:3000/My_fix.
                        Попасть на неё вы можете через любую страницу, просто нажав на свою фамилию и имя в правой верхней части шапки сайта.
                        <p className='text-danger'>
                            ВАЖНО!!! На сайте действует система ограничений, у каждого пользователя разные права к страницам! <br/>
                            Для уточнения информации уточните у Администратора
                        </p>
                    </p>
                    <Image src='/images/Pages/Header.jpg' width='1000' rounded/>
                    <Image src='/images/Pages/Pages.jpg' width='1000' rounded/>
                        <h2>
                            При переходе будет доступна таблица, в которой есть следующие действия:
                        </h2>
                    <p>
                        <ol>
                            <li>
                                Изменение
                                <ol>
                                    <li>
                                        Для изменения нажмите 2 раза на любое поле <br/>
                                        если изменение не появляется, значит оно вам не доступно
                                        <Image src='/images/Pages/Pages__izm_1.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Если поле изменено верно то текстовое поле изменится на обычную строку
                                        <Image src='/images/Pages/Pages__izm_2.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Для изменения нажмите 2 раза на любое поле <br/>
                                        если изменение не появляется, значит оно вам не доступно
                                        <Image src='/images/Pages/Pages__izm_2.jpg' width='1000' rounded/>
                                    </li>
                                </ol>

                            </li>
                            <li>
                                Удаление
                                <ol>
                                    <li>
                                        Для удаления нажмите на квадрат на одном или нескольких строках
                                        <Image src='/images/Pages/Pages_del_1.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Нажмите на кнопку “Удалить отмеченные”
                                        <Image src='/images/Pages/Pages_del_2.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Появится окно подтверждения, надо нажать на “OK”
                                        <Image src='/images/Pages/Pages_del_3.jpg' width='1000' rounded/>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                Экспорт в файл
                                <ol>
                                    <li>
                                        Для экспорта текущих данных нажмите на кнопку “Export to CSV”
                                        <Image src='/images/Pages/Pages_exp_1.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        После нажатия произойдёт скачивание файла под названием текущая дата-время.csv
                                        <Image src='/images/Pages/Pages_exp_2.jpg' width='1000' rounded/>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                Добавление

                                <ol>
                                    <p>
                                        Для того, чтобы попасть на страницу добавления услуг и получить доступ ко всем его функциям,
                                        необходимо перейти на данную страницу http://localhost:3000/Personal.
                                        Попасть на неё вы можете через страницу "Мои услуги",
                                        просто нажав на кнопку «Добавить» в правой верхней части шапки сайта.
                                        <Image src='/images/Pages/Pages_add_1.jpg' width='1000' rounded/>
                                    </p>
                                    <li>
                                        Выберите вид услуги (в списке будут только доступные услуги) <br/>
                                        Вы можете выбрать один или несколько
                                        <Image src='/images/Pages/Pages_add_2.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                       Выберете объект обслуживания
                                        <Image src='/images/Pages/Pages_add_3.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Выберете клиента
                                        <Image src='/images/Pages/Pages_add_4.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Дата начала работ введена автоматически на текущую дату, но вы можете изменить её
                                        <Image src='/images/Pages/Pages_add_5.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Напишите примерное время выполнения работ в формате 'число текст'
                                        <Image src='/images/Pages/Pages_add_6.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Цена считается автоматически, у вас нет возможности её исправить
                                        <Image src='/images/Pages/Pages__izm_6.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        при желании можно написать примечание, но можно его оставить пустым
                                        <Image src='/images/Pages/Pages_add_6.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Как только все поля формы заполнены нажмите на кнопку отправить
                                        <Image src='/images/Pages/Pages_add_6.jpg' width='1000' rounded/>
                                    </li>
                                    <li>
                                        Если всё введено верно вас перенаправит на страницу с чеком
                                        <Image src='/images/Pages/Pages_add_7.jpg' width='1000' rounded/>
                                        <ul>
                                            <li>
                                                <ol>
                                                    <li>
                                                        Если вы хотите сохранить чек, тогда нажмите на кнопку 'сохранить чек',
                                                        <Image src='/images/Pages/Pages_add_8.jpg' width='1000' rounded/>
                                                    </li>
                                                    <li>
                                                        Произойдёт скачивание чека
                                                        <Image src='/images/Pages/Pages_add_10.jpg' width='1000' rounded/>
                                                    </li>
                                                    <li>
                                                        После вас перенаправит на страницу 'Мои услуги'
                                                        <Image src='/images/Pages/Pages_add_11.jpg' width='1000' rounded/>
                                                    </li>
                                                </ol>

                                            </li>
                                            <li>
                                                <ol>
                                                    <li>
                                                        Если сохранение не требуется нажмите на кнопку 'Не сохранять чек'
                                                        <Image src='/images/Pages/Pages_add_9.jpg' width='1000' rounded/>
                                                    </li>
                                                    <li>
                                                        После вас перенаправит на страницу 'Мои услуги'
                                                        <Image src='/images/Pages/Pages_add_11.jpg' width='1000' rounded/>
                                                    </li>
                                                </ol>

                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        если всё введено верно вас перенаправит на страницу с чеком
                                        <Image src='/images/Pages/Pages.jpg' width='1000' rounded/>
                                    </li>
                                </ol>
                            </li>
                        </ol>

                    </p>
                </div>
                <div id="otchets">
                    <h1 className='text-md-left'><a name="otchets" href='#otchets'>Отчёты</a></h1>
                    <p>
                        Для того, чтобы попасть на страницу с отчётом,
                        необходимо нажать на меню "Отчёты" в правом верхнем углу любой страницы,
                    </p>
                    <Image src='/images/Otchet/Otchet.jpg' width='1000' rounded/>
                    <p>
                        В выпадающем меню будет доступно два отчёта, выбираем любой. <br/>
                        Вы можете выбрать любой
                        <h2>
                            Пример отчёта "Объект обслуживания"
                        </h2>
                        <ol>
                            <li>
                                Выбираем поле объект обслуживания
                                <Image src='/images/Otchet/Otchet_1.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                В открывшейся странице выбираем объект обслуживания
                                <Image src='/images/Otchet/Otchet_obj.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Вводим минимальную дату
                                <Image src='/images/Otchet/Otchet_min.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Вводим максимальную дату
                                <Image src='/images/Otchet/Otchet_max.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Нажимаем на кнопку 'Сформировать отчёт'
                                <Image src='/images/Otchet/Otchet_show.jpg' width='1000' rounded/>
                            </li>
                            <li>
                                Если требуется нажимаем на кнопку 'сохранить отчёт' в формате PDF
                                <Image src='/images/Otchet/Otchet_save.jpg' width='1000' rounded/>
                            </li>
                        </ol>

                    </p>
                </div>
            </div>
        )
    }
}

export  default Help;