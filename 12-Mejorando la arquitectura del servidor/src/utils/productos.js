const formatProduct = (data) => {
  const dataformat = data.docs.map((item) => {
    return {
      _id: item._id.toString(),
      title: item.title,
      description: item.description,
      price: item.price,
      status: item.status,
      category: item.category,
      thumbnail: item.thumbnail,
      code: item.code,
      stock: item.stock,
      timestamp: item.timestamp,
    };
  });
  return dataformat;
};

export default formatProduct;
