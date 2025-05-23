export async function uploadFiles() {
  const API_URL = "http://localhost:5500/graphql";
  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;

  if (files.length === 0) {
    alert("파일을 선택하세요.");
    return;
  }

  try {
    // FormData 생성
    const formData = new FormData();

    // GraphQL operations 생성
    const operations = {
      query: `
                        mutation UploadFile($files: [Upload!]!) {
                            uploadFile(files: $files)
                        }
                    `,
      variables: {
        files: Array.from(files).map((_, index) => null),
      },
    };

    // map 생성 (파일 인덱스 매핑)
    const map = {};
    Array.from(files).forEach((_, index) => {
      map[index] = [`variables.files.${index}`];
    });

    // FormData에 추가
    formData.append("operations", JSON.stringify(operations));
    formData.append("map", JSON.stringify(map));

    // 파일들을 FormData에 추가
    Array.from(files).forEach((file, index) => {
      formData.append(index.toString(), file);
    });

    // 요청 전송
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "apollo-require-preflight": "true",
      },
      body: formData,
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    // 폼 초기화
    fileInput.value = "";
  } catch (error) {
    console.error("Upload error:", error);
    alert("파일 업로드에 실패했습니다.");
  }
}

export async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:5500/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "apollo-require-preflight": "true",
      },
      body: JSON.stringify({
        query: `
          query {
            fetchProducts {
              id
            }
          }
        `,
      }),
      //   credentials: "include", // 쿠키가 필요한 경우, 아니면 빼도 됩니다
    });

    const result = await response.json();
    console.log("fetchProducts result:", result);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
