const Contacts = () => {
  return (
    <div className="container-north py-12">
      <h1 className="text-4xl md:text-5xl font-display mb-8">Контакты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-display mb-4">Свяжитесь с нами</h2>
          <div className="space-y-4 text-gray-600">
            <p>Email: info@northline.com</p>
            <p>Телефон: +7 (999) 123-45-67</p>
            <p>Адрес: Москва, ул. Примерная, 123</p>
            <p>Часы работы: Пн-Пт 10:00-19:00</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-display mb-4">Напишите нам</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-4 py-3 border border-north-light-gray focus:border-north-black outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-north-light-gray focus:border-north-black outline-none"
            />
            <textarea
              placeholder="Сообщение"
              rows={5}
              className="w-full px-4 py-3 border border-north-light-gray focus:border-north-black outline-none"
            ></textarea>
            <button type="submit" className="btn-primary">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;