import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import usePreviousValue from "./usePreviousValue";

const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(true);
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpen);

  // Bottom Sheet의 애니메이션 상태 정의
  const animationVariants = {
    hidden: { y: "67%" }, // Bottom Sheet가 화면 밖으로 완전히 사라지지 않고 일부 남아있게 함
    visible: { y: 0 }     // Bottom Sheet를 화면 최상단에 고정
  };

  const onDragEnd = (event, info) => {
    // 드래그가 끝날 때의 y 좌표에 따라 Bottom Sheet를 닫거나 엽니다.
    const shouldClose = info.offset.y > 5;

    console.log(shouldClose);
    if (shouldClose) {
      controls.start("hidden");
      setIsOpen(true);
    } else {
      controls.start("visible");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start("visible"); // 위로 올리면 전체 보여줌
    } else if (!prevIsOpen && isOpen) {
      controls.start("hidden"); // 처음에 67% 보여줌
    }
  }, [controls, isOpen, prevIsOpen]);

  return { onDragEnd, controls, setIsOpen, isOpen, animationVariants };
};

export default useBottomSheet;
