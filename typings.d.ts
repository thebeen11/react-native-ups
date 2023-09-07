type Customer = {
  email: string;
  name: string;
};

type CustomerResponse = {
  name: ID;
  value: Customer;
};

type CustomerList = {
  name: ID;
  value: Customer;
};

type Order = {
  Address: string;
  City: string;
  Lat: Float;
  Lng: Float;
  carrier: string;
  createdAt: Date;
  shippingCost: Int;
  trackingId: string;
  trackingItems: TrackingItems;
};

type OrderResponse = {
  value: Order;
};

type OrderList = {
  name: ID;
  value: Order;
};

type Items = {
  item_id: Int;
  name: string;
  price: Float;
  quantity: Int;
};

type TrackingItems = {
  customer_id: string;
  items: [Items];
  customer: Customer;
};

type TrackingItemsList = {
  name: ID;
  value: TrackingItems;
};
