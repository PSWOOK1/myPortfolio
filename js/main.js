document.addEventListener("DOMContentLoaded", (event) => {
  // 현재 페이지의 인덱스를 저장하는 변수
  let currentPage = 0;
  let isScrolling = false;

  // 특정 페이지 인덱스로 이동하는 함수
  const moveToPage = (pageIndex) => {
    // 현재 페이지를 업데이트
    currentPage = pageIndex;
    // window 객체의 scrollTo 함수를 사용하여 해당 페이지 위치로 스크롤
    window.scrollTo({
      top: window.innerHeight * currentPage, // 이동할 페이지의 세로 위치를 계산
      behavior: "smooth", // 스크롤 이동 스무~스 하게
    });
  };

  // 페이지로 이동하는 이벤트 리스너를 추가하는 함수
  const addClickListenerToHeaderItem = () => {
    document.querySelectorAll(".header-item").forEach((item, index) => {
      item.addEventListener("click", () => {
        moveToPage(index); // 클릭된 항목에 해당하는 페이지 인덱스로 이동합니다.
      });
    });
  };

  addClickListenerToHeaderItem(); // 함수 호출

  // 스크롤 이벤트를 처리하는 함수
  function scrollEventHandler(event) {
    // 스크롤중에 추가 이벤트 발생 차단
    if (isScrolling) return;
    isScrolling = true;
    // setTimeout 후에 이벤트 발생 허용
    setTimeout(() => {
      isScrolling = false;
    }, 1000);

    // 스크롤 방향에 따라 페이지 인덱스 증/감
    const delta = event.deltaY;
    if (
      delta > 0 &&
      currentPage < document.querySelectorAll(".page").length - 1
    ) {
      currentPage++; // 아래로 스크롤 시 페이지 인덱스 증가
    } else if (delta < 0 && currentPage > 0) {
      currentPage--; // 위로 스크롤 시 페이지 인덱스 감소
    }

    // 업데이트된 페이지 인덱스로 이동
    moveToPage(currentPage);
  }

  // 'wheel' = 스크롤 시 scrollEventHandler 호출
  window.addEventListener("wheel", scrollEventHandler);
});
