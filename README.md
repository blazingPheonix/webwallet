# 🔑 Mnemonic Generator & Validator

A **secure and user-friendly** React application that generates **BIP39 mnemonics**, allows users to **input their own mnemonic**, and validates them. This project is useful for **cryptocurrency wallets** and **blockchain applications** that rely on mnemonic phrases for key management.

## 🚀 Features
- ✅ **Generate Mnemonic** – Create a 12-word BIP39 mnemonic phrase.  
- ✅ **Copy Mnemonic** – Copy the generated mnemonic to the clipboard.  
- ✅ **Enter Custom Mnemonic** – Manually input a mnemonic phrase.  
- ✅ **Validate Mnemonic** – Check if the entered mnemonic is valid.  
- ✅ **Redux Integration** – Mnemonics are managed using Redux.  
- ✅ **User-friendly UI** – Responsive and modern design with Tailwind CSS.  

---

## 🏰 Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS  
- **State Management:** Redux Toolkit  
- **Libraries Used:** `bip39`, `react-hot-toast`  

---

## 📌 Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/mnemonic-generator.git
cd mnemonic-generator
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Run the Development Server**
```sh
npm run dev
```
Now, open **http://localhost:5173/** in your browser.

---

 
1. Click on **"Generate Mnemonic"** to create a 12-word phrase.
2. The mnemonic will be displayed in a **grid format**.
3. You can **copy** the mnemonic using the "Copy Mnemonic" button.
4. **To validate**, enter a mnemonic manually in the input field.
5. If the entered mnemonic is valid, a **success message** will be displayed.
6. If the mnemonic is invalid, an **error message** will appear.

---

## 📤 Deployment
### **Deploy on Vercel**
1. Push your code to GitHub.
2. Create a new project on [Vercel](https://vercel.com/).
3. Connect your repository and deploy.

If you face any **TypeScript or missing module issues**, ensure:
```sh
npm install ethers bs58 @types/bs58 --save-dev
```
and update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

---

 

---

 

## 🐝 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

---



---

## 💌 Contact
For queries, feel free to reach out!  
📧 Email: [shandilya.rishabh117@gmail.com](mailto:shandilya.rishabh117@gmail.com)  
🐦

