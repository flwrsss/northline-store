const Delivery = () => {
  return (
    <div className="container-north py-12">
      <h1 className="text-4xl md:text-5xl font-display mb-8">Доставка</h1>
      <div className="max-w-3xl space-y-8">
        <div>
          <h2 className="text-2xl font-display mb-4">Способы доставки</h2>
          <div className="space-y-4">
            <div className="border border-north-light-gray p-6">
              <h3 className="font-medium mb-2">Курьерская доставка</h3>
              <p className="text-gray-600">2-3 рабочих дня. Стоимость: 350 ₽</p>
            </div>
            <div className="border border-north-light-gray p-6">
              <h3 className="font-medium mb-2">Почта России</h3>
              <p className="text-gray-600">5-10 рабочих дней. Стоимость: 250 ₽</p>
            </div>
            <div className="border border-north-light-gray p-6">
              <h3 className="font-medium mb-2">Самовывоз</h3>
              <p className="text-gray-600">Бесплатно. Москва, ул. Примерная, 123</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-display mb-4">Сроки обработки заказа</h2>
          <p className="text-gray-600">Обработка заказа занимает 1-2 рабочих дня после подтверждения оплаты.</p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;