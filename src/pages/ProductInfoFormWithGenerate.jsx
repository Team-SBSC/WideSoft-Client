import { useState } from "react";
import { fetchProducts, uploadFiles } from "../utils/test";
// import { axios } from "axios";
// import { fs } from "fs";

export default function ProductInfoFormWithGenerate() {
  const [productName, setProductName] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [generatedResults, setGeneratedResults] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const removeImage = (imageId) => {
    setUploadedImages(uploadedImages.filter((img) => img.id !== imageId));
  };

  const handleSubmit = () => {
    if (!productName.trim()) {
      alert("상품명을 입력해주세요!");
      return;
    }

    const newResult = {
      id: Date.now(),
      timestamp: new Date().toLocaleString("ko-KR"),
      productName: productName,
      productInfo: productInfo,
      images: [...uploadedImages],
      generatedContent: generateMockContent(productName, productInfo),
    };
    setGeneratedResults([newResult, ...generatedResults]);
    fetchProducts();

    uploadFiles();
    // const operation = {
    //   query: `mutation uploadFile($files: [Upload!]!) {
    //     uploadFile(files: $files)
    //   }`,
    //   variables: {
    //     files: newResult.images.map(() => null),
    //   },
    // };

    // const map = {};
  };

  const generateMockContent = (name, info) => {
    const templates = [
      `🌟 ${name} 특별 출시! 🌟

신선하고 품질 좋은 ${name}를 소개합니다!

✅ 특징:
${info || "최고 품질의 농산물로 정성껏 재배했습니다"}

🚚 빠른 배송으로 신선함을 그대로 전달
💝 합리적인 가격으로 만나보세요

지금 주문하고 건강한 식탁을 완성하세요!`,

      `${name} 프리미엄 품질 보장! 

🏆 엄선된 ${name}
${info || "농장에서 직접 재배한 신선한 농산물"}

📦 당일 수확 → 당일 발송
🌱 무농약 재배로 안심하고 드세요
⭐ 고객 만족도 98% 달성

건강한 선택, ${name}와 함께하세요!`,

      `🎉 ${name} 대박 세일! 🎉

💚 100% 자연 재배 ${name}
${info || "정성과 사랑으로 키운 프리미엄 농산물"}

🔥 한정 수량 특가 판매
📞 주문 폭주로 품절 임박
🚀 지금 주문하면 내일 받아보세요

놓치면 후회하는 기회! 지금 바로 주문하세요!`,
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  };

  const clearResults = () => {
    setGeneratedResults([]);
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "'Malgun Gothic', sans-serif",
      // backgroundColor: "#fefce8",
      backgroundColor: "#FFFFE0",
      // backgroundColor: "white",
    },
    leftPanel: {
      width: "30%",
      padding: "20px",
      overflowY: "auto",
    },
    rightPanel: {
      width: "70%",
      padding: "20px",
      borderLeft: "1px solid #1f2937",
      backgroundColor: "#f8fafc",
      display: "flex",
      flexDirection: "column",
    },
    formContainer: {
      position: "relative",
      maxWidth: "600px",
      backgroundColor: "white",
      // border: "1px solid #1f2937",
      borderRadius: "12px",
      padding: "40px",
      height: "85vh",
      // marginTop: "60px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "30px",
      margin: 0,
    },
    resultsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      paddingBottom: "15px",
      borderBottom: "2px solid #e5e7eb",
    },
    resultsTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1f2937",
      margin: 0,
    },
    clearButton: {
      padding: "8px 16px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
    },
    resultsContainer: {
      flex: 1,
      overflowY: "auto",
      paddingRight: "10px",
    },
    resultCard: {
      backgroundColor: "white",
      // border: "1px solid #1f2937",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    resultHeader: {
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "10px",
      marginBottom: "15px",
    },
    resultTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#1f2937",
      margin: "0 0 5px 0",
    },
    resultTimestamp: {
      fontSize: "12px",
      color: "#6b7280",
    },
    resultContent: {
      whiteSpace: "pre-line",
      lineHeight: "1.6",
      color: "#374151",
      fontSize: "14px",
    },
    resultImages: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
      flexWrap: "wrap",
    },
    resultImage: {
      width: "60px",
      height: "60px",
      objectFit: "cover",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
    },
    emptyState: {
      textAlign: "center",
      color: "#6b7280",
      fontSize: "16px",
      marginTop: "50px",
    },
    formGroup: {
      marginBottom: "25px",
    },
    label: {
      display: "block",
      fontSize: "18px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "12px",
      marginTop: "20px",
    },
    inputField: {
      width: "100%",
      padding: "15px",
      border: "1px solid #1f2937",
      borderRadius: "8px",
      fontSize: "16px",
      backgroundColor: "white",
      // backgroundColor: "#FFFFE0",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    textareaField: {
      width: "100%",
      padding: "15px",
      border: "1px solid #1f2937",
      borderRadius: "8px",
      fontSize: "16px",
      backgroundColor: "white",
      // backgroundColor: "#FFFFE0",
      resize: "none",
      minHeight: "120px",
      fontFamily: "inherit",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    imageUploadContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "20px",
    },
    uploadButton: {
      width: "80px",
      height: "80px",
      border: "1px solid #1f2937",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      backgroundColor: "white",
      // backgroundColor: "#FFFFE0",
      transition: "background-color 0.2s ease",
      position: "relative",
      fontSize: "32px",
      color: "#6b7280",
      fontWeight: "bold",
    },
    uploadInput: {
      display: "none",
    },
    imagePreview: {
      width: "80px",
      height: "80px",
      // border: "2px solid #1f2937",
      borderRadius: "8px",
      overflow: "hidden",
      position: "relative",
    },
    imagePreviewImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    removeButton: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      width: "24px",
      height: "24px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s ease",
    },
    defaultImage: {
      width: "80px",
      height: "80px",
      // border: "2px solid #1f2937",
      borderRadius: "8px",
      background:
        "linear-gradient(45deg, #22c55e 0%, #16a34a 50%, #15803d 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    },
    submitButton: {
      position: "absolute",
      bottom: "30px",
      // width: "80%",
      padding: "16px",
      backgroundColor: "white",
      // backgroundColor: "#FFFFE0",
      border: "1px solid #1f2937",
      borderRadius: "8px",
      fontSize: "20px",
      fontWeight: "bold",
      color: "#1f2937",
      cursor: "pointer",
      transition: "all 0.2s ease",
      left: "40px",
      right: "40px",
    },
  };

  return (
    <div style={styles.container}>
      {/* 왼쪽 패널 - 입력 폼 */}
      <div style={styles.leftPanel}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>제품 정보를 입력해주세요</h1>

          {/* 상품명 입력 */}
          <div style={styles.formGroup}>
            <label style={styles.label}>상품명 입력</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={styles.inputField}
              placeholder="판매할 상품의 이름을 입력하세요"
            />
          </div>

          {/* 포함되어야 할 상품 정보 & 요청사항 */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              포함되어야 할 상품 정보 & 요청사항
            </label>
            <textarea
              value={productInfo}
              onChange={(e) => setProductInfo(e.target.value)}
              style={styles.textareaField}
              placeholder="필요한 마음으로 적어주세요&#10;AI가 참적같이 알아듣고 홍보해줄거에요"
            />
          </div>

          {/* 사진 첨부 */}
          <div style={styles.formGroup}>
            <label style={styles.label}>사진을 첨부해주세요</label>
            <div style={styles.imageUploadContainer}>
              <label style={styles.uploadButton}>
                +
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={styles.uploadInput}
                />
              </label>

              {uploadedImages.map((image) => (
                <div key={image.id} style={styles.imagePreview}>
                  <img
                    src={image.url}
                    alt={image.name}
                    style={styles.imagePreviewImg}
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    style={styles.removeButton}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#dc2626")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#ef4444")
                    }
                  >
                    ×
                  </button>
                </div>
              ))}

              {uploadedImages.length === 0 && (
                <div style={styles.defaultImage}>
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "15px",
                      right: "15px",
                      bottom: "30px",
                      backgroundColor: "#166534",
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "20px",
                      right: "20px",
                      bottom: "20px",
                      backgroundColor: "#22c55e",
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* 생성하기 버튼 */}
          <button
            onClick={handleSubmit}
            style={styles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f9fafb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            생성하기
          </button>
        </div>
      </div>

      {/* 오른쪽 패널 - 생성된 결과 */}
      <div style={styles.rightPanel}>
        <div style={styles.resultsHeader}>
          <h2 style={styles.resultsTitle}>생성된 홍보 문구</h2>
          {generatedResults.length > 0 && (
            <button
              onClick={clearResults}
              style={styles.clearButton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
            >
              전체 삭제
            </button>
          )}
        </div>

        <div style={styles.resultsContainer}>
          {generatedResults.length === 0 ? (
            <div style={styles.emptyState}>
              <p>생성된 결과가 없습니다.</p>
              <p>왼쪽에서 제품 정보를 입력하고 "생성하기" 버튼을 눌러보세요!</p>
            </div>
          ) : (
            generatedResults.map((result) => (
              <div key={result.id} style={styles.resultCard}>
                <div style={styles.resultHeader}>
                  <h3 style={styles.resultTitle}>{result.productName}</h3>
                  <p style={styles.resultTimestamp}>{result.timestamp}</p>
                </div>
                <div style={styles.resultContent}>
                  {result.generatedContent}
                </div>
                {result.images.length > 0 && (
                  <div style={styles.resultImages}>
                    {result.images.map((image) => (
                      <img
                        key={image.id}
                        src={image.url}
                        alt={image.name}
                        style={styles.resultImage}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
