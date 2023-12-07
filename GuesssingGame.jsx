import React, { useState } from 'react';  
  
const BetForm = () => {  
  const [price, setPrice] = useState(null);  
  const [address, setAddress] = useState(null);  
  const [message, setMessage] = useState(null);  
  
  const handleSubmit = async () => {  
    try {  
      // 在此验证价格和地址的有效性，例如通过API调用或区块链验证  
      if (price && address) {  
        // 发送投注请求到后端服务器，并存储用户的投注信息  
        const result = await fetch('/api/bet', {  
          method: 'POST',  
          headers: {  
            'Content-Type': 'application/json',  
          },  
          body: JSON.stringify({ price, address }),  
        });  
        const data = await result.json();  
        setMessage(data.message);  
      } else {  
        setMessage('请输入有效的价格和地址');  
      }  
    } catch (error) {  
      setMessage('投注请求失败，请重试');  
    }  
  };  
  
  return (  
    <div>  
      <h2>预测2024年比特币的最高价格</h2>  
      <form onSubmit={handleSubmit}>  
        <label>  
          价格：<input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />  
        </label>  
        <br />  
        <label>  
          加密货币地址：<input type="text" value={address} onChange={e => setAddress(e.target.value)} />  
        </label>  
        <br />  
        <button type="submit">投注</button>  
        <p>{message}</p>  
      </form>  
    </div>  
  );  
};  
  
export default BetForm;