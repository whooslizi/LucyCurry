export const events = [
  {
    id: "scam_fake_payment",
    title: "Thanh toán khả nghi",
    description: "Một khách hàng gửi ảnh màn hình chuyển khoản, nhưng tiền chưa vào tài khoản.",
    choices: [
      { text: "Chờ tiền vào mới giao", consequence: "safe" },
      { text: "Tin tưởng và giao luôn", consequence: "risk" }
    ]
  }
];
