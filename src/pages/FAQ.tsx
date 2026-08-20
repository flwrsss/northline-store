const FAQ = () => {
  const faqs = [
    {
      question: 'Как выбрать размер?',
      answer: 'В карточке каждого товара есть размерная сетка. Если вы сомневаетесь, рекомендуем выбрать размер больше.'
    },
    {
      question: 'Как ухаживать за одеждой?',
      answer: 'Рекомендации по уходу указаны на этикетке каждого изделия и в описании товара.'
    },
    {
      question: 'Можно ли вернуть товар?',
      answer: 'Да, вы можете вернуть товар в течение 14 дней с момента получения, если он не был в использовании.'
    },
    {
      question: 'Как отследить заказ?',
      answer: 'После отправки заказа вы получите трек-номер на email для отслеживания.'
    }
  ];

  return (
    <div className="container-north py-12">
      <h1 className="text-4xl md:text-5xl font-display mb-8">FAQ</h1>
      <div className="max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-north-light-gray p-6">
            <h3 className="font-medium mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;