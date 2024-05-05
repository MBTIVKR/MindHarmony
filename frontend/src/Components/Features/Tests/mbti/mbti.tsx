//@ts-nocheck
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Title,
  Card,
} from "@mantine/core";
import { questions } from "./questions";
import { useAuth, useMBTIStore } from "@/Store"; // Используем только useMBTIStore
import ProfileCard from "./ProfileCard";
import { OtherTestsSlider } from "../OtherTests/otherTests";
import { mbtiProfiles } from "./descriptions/mbtiProfiles";
import { $host } from "@/Services/instance";

const MBTITest = () => {
  const {
    currentQuestion,
    type,
    showResult,
    handleAnswer,
    checkResult,
    answers,
    setUserMBTIType,
  } = useMBTIStore();

  const userID = useAuth((state) => state.user.id);
  const [userMBTIType, setUserMBTITypeLocally] = useState(null);

  useEffect(() => {
    // Load user's MBTI type from the server
    $host.get(`/api/mbti/${userID}`)
      .then(response => {
        setUserMBTITypeLocally(response.data.type);
      })
      .catch(error => {
        console.error('Failed to fetch MBTI results from server:', error);
      });
  }, [userID]);

  useEffect(() => {
    // Set user's MBTI type if loaded from the server
    if (userMBTIType) {
      setUserMBTIType(userMBTIType);
    }
  }, [userMBTIType, setUserMBTIType]);

  useEffect(() => {
    if (showResult) {
      checkResult();
      $host.post(`/api/update-mbti-result/${userID}`, { type })
        .then(response => {
          console.log('Results successfully sent to the server:', response.data);
        })
        .catch(error => {
          console.error('Failed to send MBTI results to server:', error);
        });

      setUserMBTIType(type);
      localStorage.setItem("mbtiResult", type);
    }
  }, [showResult, checkResult, type, setUserMBTIType, userID]);

  useEffect(() => {
    localStorage.setItem("mbtiAnswers", JSON.stringify(answers));
  }, [answers]);

  const currentProfile = mbtiProfiles.find((profile) =>
    profile.title.includes(type)
  );

  return (
    <Stack pt={40}>
      <Title ta="center">Тест MBTI</Title>
      {!showResult && currentQuestion < questions.length && (
        <div>
          <Text className="question" ta="center" pb={20} size="lg">
            {questions[currentQuestion].text}
          </Text>
          <Flex mt={10} justify="center">
            <Box
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="default"
                  onClick={() => handleAnswer(questions[currentQuestion].id, index - 3)}
                >
                  {option}
                </Button>
              ))}
            </Box>
          </Flex>
        </div>
      )}
      {showResult && currentProfile && (
        <>
          <ProfileCard profile={currentProfile} />
          <Card radius="md" p="lg" mb={100}>
            <Stack>
              <Title order={2}>Доступные тестирования</Title>
              <OtherTestsSlider excludeTest="Тестирование MBTI" />
            </Stack>
          </Card>
        </>
      )}
    </Stack>
  );
};

export default MBTITest;


//! SHEAT
// import { useEffect, useState } from "react";
// import { Box, Button, Flex, Stack, Text, Title, useMantineTheme, Image, Card } from "@mantine/core";
// import { questions } from "./questions";
// import { useAuth, useMBTIStore } from "@/Store";
// import { $host } from "@/Services/instance";
// import { mbtiProfiles } from "./descriptions/mbtiProfiles";
// import { OtherTestsSlider } from "../OtherTests/otherTests";
// import ProfileCard from "./ProfileCard";

// const MBTITest = () => {
//   const userID = useAuth((state) => state.user.id);
//   const theme = useMantineTheme();
//   const {
//     currentQuestion,
//     type,
//     showResult,
//     handleAnswer,
//     checkResult,
//     answers,
//   } = useMBTIStore();
//   const [hasTested, setHasTested] = useState(false);

//   useEffect(() => {
//     $host.get(`/api/mbti/${userID}`)
//       .then((response) => {
//         if (response.status === 200 && response.data.type) {
//           setHasTested(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Ошибка при получении информации о MBTI:", error);
//       });
//   }, [userID]);

//   const currentProfile = mbtiProfiles.find(profile => profile.title.includes(type));

//   const handleRetakeTest = async () => {
//     setHasTested(false); // Сбросить флаг прохождения теста
//     const updatedType = await checkResult(); // Пересчитать результаты теста и получить новый тип
//     sendResultsToServer(updatedType); // Обновленный тип отправляется на сервер
//   };

//   const sendResultsToServer = (updatedType) => {
//     if (updatedType) {
//       $host.post(`/api/update-mbti-result/${userID}`, { type: updatedType })
//         .then(response => {
//           if (response.status === 200) {
//             console.log("Результат успешно отправлен на сервер");
//           } else {
//             console.error("Ошибка при отправке результата на сервер");
//           }
//         })
//         .catch(error => {
//           console.error("Ошибка при отправке результата на сервер:", error);
//         });
//     } else {
//       console.error("Нет данных для отправки на сервер");
//     }
//   };

//   useEffect(() => {
//     if (showResult && !hasTested) {
//       handleRetakeTest();
//       setHasTested(true);
//     }
//   }, [showResult, hasTested]);

//   return (
//     <Stack pt={40}>
//       <Title ta="center">Тест MBTI</Title>
//       {hasTested && !showResult && currentProfile && (
//         <>
//           <ProfileCard profile={currentProfile} />
//           <Button onClick={handleRetakeTest}>Пройти еще раз</Button>
//         </>
//       )}
//       {!hasTested && currentQuestion < questions.length && (
//         <div>
//           <Text className="question" ta="center" pb={20} size="lg">
//             {questions[currentQuestion].text}
//           </Text>
//           <Flex mt={10} justify="center">
//             <Box style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, textAlign: "center", margin: "0px auto", justifyContent: "center" }}>
//               {questions[currentQuestion].options.map((option, index) => (
//                 <Button key={index} variant="default" onClick={() => handleAnswer(questions[currentQuestion].id, parseInt(option))}>
//                   {option}
//                 </Button>
//               ))}
//             </Box>
//           </Flex>
//         </div>
//       )}
//       {showResult && currentProfile && (
//         <Card radius={10} pb={30}>
//           <Title order={2}>Результаты теста</Title>
//           <Flex gap={20} direction={{ sm: "row", base: "column" }}>
//             <Image src={currentProfile.avatar} alt={type} w={{ sm: "25%", base: "90%" }} m="auto" ta="center" pt={40} />
//             <Stack mt={"auto"}>
//               <Text size="lg" style={{ marginTop: theme.spacing.sm }}>
//                 Ваш тип личности: {type ? `${type}` : "Вычисление результата..."}
//               </Text>
//               <Text size="lg">
//                 Описание типа: {type ? currentProfile.description : "Описание типа загружается..."}
//               </Text>
//             </Stack>
//           </Flex>
//         </Card>
//       )}
//     </Stack>
//   );
// };

// export default MBTITest;

// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   Stack,
//   Text,
//   Title,
//   useMantineTheme,
//   Image,
//   Card,
// } from "@mantine/core";
// import { questions } from "./questions";
// import { useAuth, useMBTIStore } from "@/Store";
// import { $host } from "@/Services/instance";
// import { mbtiProfiles } from "./descriptions/mbtiProfiles";
// import { OtherTestsSlider } from "../OtherTests/otherTests";

// const MBTITest = () => {
//   const userID = useAuth((state) => state.user.id);
//   const theme = useMantineTheme();
//   const {
//     currentQuestion,
//     type,
//     showResult,
//     handleAnswer,
//     checkResult,
//     answers,
//     setShowResult,
//     resetState,
//   } = useMBTIStore();
//   const [hasTested, setHasTested] = useState(false);

//   // Загрузка предыдущих результатов
//   useEffect(() => {
//     $host.get(`/api/mbti/${userID}`).then(response => {
//       if (response.status === 200 && response.data.type) {
//         setHasTested(true);
//         checkResult().then(() => {
//           setShowResult(true);
//         });
//       }
//     }).catch(error => {
//       console.error("Error fetching MBTI info:", error);
//     });
//   }, [userID, checkResult, setShowResult]);
  
//   // Подготовка данных для отображения результата
//   const currentProfile = mbtiProfiles.find(profile => profile.title.includes(type));

//   // Обработка повторного прохождения теста
//   const handleRetakeTest = () => {
//     resetState();
//     setHasTested(false);
//   };

//   // Отправка результатов на сервер после завершения теста
//   useEffect(() => {
//     if (showResult && !hasTested) {
//       $host.post(`/api/update-mbti-result/${userID}`, { type }).then(response => {
//         if (response.status === 200) {
//           console.log("Results successfully sent to server.");
//         } else {
//           console.error("Failed to send results to server.");
//         }
//       }).catch(error => {
//         console.error("Error sending results to server:", error);
//       });
//       setHasTested(true);
//     }
//   }, [showResult, hasTested, type, userID]);

//   return (
//     <Stack pt={40}>
//       <Title ta="center">Тест MBTI</Title>
//       {!hasTested && currentQuestion < questions.length && (
//         <div>
//           <Text className="question" ta="center" pb={20} size="lg">
//             {questions[currentQuestion].text}
//           </Text>
//           <Flex mt={10} justify="center">
//             <Box style={{
//               width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, textAlign: "center", margin: "0px auto", justifyContent: "center"
//             }}>
//               {questions[currentQuestion].options.map((option, index) => (
//                 <Button key={index} variant="default" onClick={() => handleAnswer(questions[currentQuestion].id, parseInt(option, 10))}>
//                   {option}
//                 </Button>
//               ))}
//             </Box>
//           </Flex>
//         </div>
//       )}
//       {showResult && currentProfile && (
//         <>
//           <Card radius={10} pb={30}>
//             <Title order={2}>Test Results</Title>
//             <Flex gap={20} direction={{ sm: "row", base: "column" }}>
//               <Image src={currentProfile.avatar} alt={type} w={{ sm: "25%", base: "90%" }} m="auto" ta="center" pt={40} />
//               <Stack mt={"auto"}>
//                 <Text size="lg" style={{ marginTop: theme.spacing.sm }}>
//                   Your Personality Type: {type ? `${type}` : "Calculating result..."}
//                 </Text>
//                 <Text size="lg">
//                   Type Description: {type ? currentProfile.description : "Loading description..."}
//                 </Text>
//               </Stack>
//             </Flex>
//           </Card>
//           <Button onClick={handleRetakeTest}>Retake Test</Button>
//         </>
//       )}
//     </Stack>
//   );
// };

// export default MBTITest;


// import { useEffect, useState } from "react";
// import { Box, Button, Flex, Stack, Text, Title, useMantineTheme, Image, Card } from "@mantine/core";
// import { questions } from "./questions";
// import { useAuth, useMBTIStore } from "@/Store";
// import { $host } from "@/Services/instance";
// import { mbtiProfiles } from "./descriptions/mbtiProfiles";
// import { OtherTestsSlider } from "../OtherTests/otherTests";
// import ProfileCard from "./ProfileCard";

// const MBTITest = () => {
//   const userID = useAuth((state) => state.user.id);
//   const theme = useMantineTheme();
//   const {
//     currentQuestion,
//     type,
//     showResult,
//     handleAnswer,
//     checkResult,
//     answers,
//   } = useMBTIStore();
//   const [hasTested, setHasTested] = useState(false);

//   useEffect(() => {
//     $host.get(`/api/mbti/${userID}`)
//       .then((response) => {
//         if (response.status === 200 && response.data.type) {
//           setHasTested(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Ошибка при получении информации о MBTI:", error);
//       });
//   }, [userID]);

//   const currentProfile = mbtiProfiles.find(profile => profile.title.includes(type));

//   const handleRetakeTest = async () => {
//     setHasTested(false); // Сбросить флаг прохождения теста
//     const updatedType = await checkResult(); // Пересчитать результаты теста и получить новый тип
//     sendResultsToServer(updatedType); // Обновленный тип отправляется на сервер
//   };

//   const sendResultsToServer = (updatedType) => {
//     if (updatedType) {
//       $host.post(`/api/update-mbti-result/${userID}`, { type: updatedType })
//         .then(response => {
//           if (response.status === 200) {
//             console.log("Результат успешно отправлен на сервер");
//           } else {
//             console.error("Ошибка при отправке результата на сервер");
//           }
//         })
//         .catch(error => {
//           console.error("Ошибка при отправке результата на сервер:", error);
//         });
//     } else {
//       console.error("Нет данных для отправки на сервер");
//     }
//   };

//   useEffect(() => {
//     if (showResult && !hasTested) {
//       handleRetakeTest();
//       setHasTested(true);
//     }
//   }, [showResult, hasTested]);

//   return (
//     <Stack pt={40}>
//       <Title ta="center">Тест MBTI</Title>
//       {hasTested && !showResult && currentProfile && (
//         <>
//           <ProfileCard profile={currentProfile} />
//           <Button onClick={handleRetakeTest}>Пройти еще раз</Button>
//         </>
//       )}
//       {!hasTested && currentQuestion < questions.length && (
//         <div>
//           <Text className="question" ta="center" pb={20} size="lg">
//             {questions[currentQuestion].text}
//           </Text>
//           <Flex mt={10} justify="center">
//             <Box style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, textAlign: "center", margin: "0px auto", justifyContent: "center" }}>
//               {questions[currentQuestion].options.map((option, index) => (
//                 <Button key={index} variant="default" onClick={() => handleAnswer(questions[currentQuestion].id, option)}>
//                   {option}
//                 </Button>
//               ))}
//             </Box>
//           </Flex>
//         </div>
//       )}
//       {showResult && currentProfile && (
//         <Card radius={10} pb={30}>
//           <Title order={2}>Результаты теста</Title>
//           <Flex gap={20} direction={{ sm: "row", base: "column" }}>
//             <Image src={currentProfile.avatar} alt={type} w={{ sm: "25%", base: "90%" }} m="auto" ta="center" pt={40} />
//             <Stack mt={"auto"}>
//               <Text size="lg" style={{ marginTop: theme.spacing.sm }}>
//                 Ваш тип личности: {type ? `${type}` : "Вычисление результата..."}
//               </Text>
//               <Text size="lg">
//                 Описание типа: {type ? currentProfile.description : "Описание типа загружается..."}
//               </Text>
//             </Stack>
//           </Flex>
//         </Card>
//       )}
//     </Stack>
//   );
// };

// export default MBTITest;

// import { useEffect, useState } from "react";
// import { Box, Button, Flex, Stack, Text, Title, useMantineTheme, Image, Card } from "@mantine/core";
// import { questions } from "./questions";
// import { useAuth, useMBTIStore } from "@/Store";
// import { $host } from "@/Services/instance";
// import { mbtiProfiles } from "./descriptions/mbtiProfiles";
// import { OtherTestsSlider } from "../OtherTests/otherTests";
// import ProfileCard from "./ProfileCard";

// const MBTITest = () => {
//   const userID = useAuth((state) => state.user.id);
//   const theme = useMantineTheme();
//   const {
//     currentQuestion,
//     type,
//     showResult,
//     handleAnswer,
//     checkResult,
//     answers,
//   } = useMBTIStore();
//   const [hasTested, setHasTested] = useState(false);

//   useEffect(() => {
//     $host.get(`/api/mbti/${userID}`)
//       .then((response) => {
//         if (response.status === 200 && response.data.type) {
//           setHasTested(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Ошибка при получении информации о MBTI:", error);
//       });
//   }, [userID]);

//   const currentProfile = mbtiProfiles.find(profile => profile.title.includes(type));

//   const handleRetakeTest = async () => {
//     setHasTested(false); // Сбросить флаг прохождения теста
//     await checkResult(); // Пересчитать результаты теста
//     sendResultsToServer();
//   };

//   const sendResultsToServer = () => {
//     if (type) {
//       $host.post(`/api/update-mbti-result/${userID}`, { type })
//         .then(response => {
//           if (response.status === 200) {
//             console.log("Результат успешно отправлен на сервер");
//           } else {
//             console.error("Ошибка при отправке результата на сервер");
//           }
//         })
//         .catch(error => {
//           console.error("Ошибка при отправке результата на сервер:", error);
//         });
//     } else {
//       console.error("Нет данных для отправки на сервер");
//     }
//   };

//   useEffect(() => {
//     if (showResult && !hasTested) {
//       handleRetakeTest();
//       setHasTested(true);
//     }
//   }, [showResult, hasTested]);

//   return (
//     <Stack pt={40}>
//       <Title ta="center">Тест MBTI</Title>
//       {hasTested && !showResult && currentProfile && (
//         <>
//           <ProfileCard profile={currentProfile} />
//           <Button onClick={handleRetakeTest}>Пройти еще раз</Button>
//         </>
//       )}
//       {!hasTested && currentQuestion < questions.length && (
//         <div>
//           <Text className="question" ta="center" pb={20} size="lg">
//             {questions[currentQuestion].text}
//           </Text>
//           <Flex mt={10} justify="center">
//             <Box style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, textAlign: "center", margin: "0px auto", justifyContent: "center" }}>
//               {questions[currentQuestion].options.map((option, index) => (
//                 <Button key={index} variant="default" onClick={() => handleAnswer(questions[currentQuestion].id, option)}>
//                   {option}
//                 </Button>
//               ))}
//             </Box>
//           </Flex>
//         </div>
//       )}
//       {showResult && currentProfile && (
//         <Card radius={10} pb={30}>
//           <Title order={2}>Результаты теста</Title>
//           <Flex gap={20} direction={{ sm: "row", base: "column" }}>
//             <Image src={currentProfile.avatar} alt={type} w={{ sm: "25%", base: "90%" }} m="auto" ta="center" pt={40} />
//             <Stack mt={"auto"}>
//               <Text size="lg" style={{ marginTop: theme.spacing.sm }}>
//                 Ваш тип личности: {type ? `${type}` : "Вычисление результата..."}
//               </Text>
//               <Text size="lg">
//                 Описание типа: {type ? currentProfile.description : "Описание типа загружается..."}
//               </Text>
//             </Stack>
//           </Flex>
//         </Card>
//       )}
//     </Stack>
//   );
// };

// export default MBTITest;



// // Тут грузится результат пользователя если он проходил тест, но если перепройти тест - результат не отправляется на сервер =(
// // import { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   Flex,
// //   Stack,
// //   Text,
// //   Title,
// //   useMantineTheme,
// //   Image,
// //   Card,
// // } from "@mantine/core";
// // import { questions } from "./questions";
// // import { useAuth, useMBTIStore } from "@/Store";
// // import { $host } from "@/Services/instance";
// // import { mbtiProfiles } from "./descriptions/mbtiProfiles";
// // import { OtherTestsSlider } from "../OtherTests/otherTests";
// // import ProfileCard from "./ProfileCard";

// // const MBTITest = () => {
// //   const userID = useAuth((state) => state.user.id);
// //   const theme = useMantineTheme();
// //   const {
// //     currentQuestion,
// //     type,
// //     showResult,
// //     handleAnswer,
// //     checkResult,
// //     answers,
// //   } = useMBTIStore();
// //   const [hasTested, setHasTested] = useState(false);

// //   useEffect(() => {
// //     $host
// //       .get(`/api/mbti/${userID}`)
// //       .then((response) => {
// //         if (response.status === 200 && response.data.type) {
// //           setHasTested(true);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Ошибка при получении информации о MBTI:", error);
// //       });
// //   }, [userID]);

// //   useEffect(() => {
// //     localStorage.setItem("mbtiAnswers", JSON.stringify(answers));
// //   }, [answers]);

// //   const getTypeDescription = (type) => {
// //     const typeInfo = mbtiProfiles.find((profile) =>
// //       profile.title.includes(type)
// //     );
// //     return typeInfo ? typeInfo.description : "Описание недоступно.";
// //   };

// //   const getTypeAvatar = (type) => {
// //     const typeInfo = mbtiProfiles.find((profile) =>
// //       profile.title.includes(type)
// //     );
// //     return typeInfo ? typeInfo.avatar : "not_found.png";
// //   };

// //   const currentProfile = mbtiProfiles.find((profile) =>
// //     profile.title.includes(type)
// //   );

// //   const handleRetakeTest = () => {
// //     setHasTested(false); // Сбросить состояние прохождения теста
// //     checkResult(); // Проверить результат теста
// //   };

// //   const sendResultsToServer = () => {
// //     // Проверяем, что ответы есть и не пусты
// //     if (answers?.length > 0) {
// //       // Отправляем результаты теста на сервер
// //       $host
// //         .post(`/api/update-mbti-result/${userID}`, { answers })
// //         .then((response) => {
// //           if (response.status === 200) {
// //             console.log("Результат успешно отправлен на сервер");
// //           } else {
// //             console.error("Ошибка при отправке результата на сервер");
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Ошибка при отправке результата на сервер:", error);
// //         });
// //       // Сохраняем результаты теста в локальное хранилище
// //       localStorage.setItem("mbtiResult", JSON.stringify(answers));
// //     } else {
// //       console.error("Нет данных для отправки на сервер");
// //     }
// //   };

// //   // Проверяем результаты и отправляем на сервер, если пользователь прошел тест
// //   useEffect(() => {
// //     if (showResult && hasTested) {
// //       sendResultsToServer();
// //     }
// //   }, [showResult, hasTested]);

// //   return (
// //     <Stack pt={40}>
// //       <Title ta="center">Тест MBTI</Title>
// //       {hasTested && currentProfile && (
// //         <>
// //           <ProfileCard profile={currentProfile} />
// //           <Button onClick={handleRetakeTest}>Пройти еще раз</Button>
// //           <Card radius="md" p="lg" mb={100}>
// //             <Stack>
// //               <Title order={2}>Доступные тестирования</Title>
// //               <OtherTestsSlider excludeTest="Тестирование MBTI" />
// //             </Stack>
// //           </Card>
// //         </>
// //       )}
// //       {!hasTested && currentQuestion < questions.length && (
// //         <div>
// //           <Text className="question" ta="center" pb={20} size="lg">
// //             {questions[currentQuestion].text}
// //           </Text>
// //           <Flex mt={10} justify="center">
// //             <Box
// //               style={{
// //                 width: "100%",
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(2, 1fr)",
// //                 gap: 12,
// //                 textAlign: "center",
// //                 margin: "0px auto",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               {questions[currentQuestion].options.map((option, index) => (
// //                 <Button
// //                   key={index}
// //                   variant="default"
// //                   onClick={() =>
// //                     handleAnswer(questions[currentQuestion].id, index - 3)
// //                   }
// //                 >
// //                   {option}
// //                 </Button>
// //               ))}
// //             </Box>
// //           </Flex>
// //         </div>
// //       )}
// //     </Stack>
// //   );
// // };

// // export default MBTITest;

// // import { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   Flex,
// //   Stack,
// //   Text,
// //   Title,
// //   useMantineTheme,
// //   Image,
// //   Card,
// // } from "@mantine/core";
// // import { questions } from "./questions";
// // import { useAuth, useMBTIStore } from "@/Store";
// // import { $host } from "@/Services/instance";
// // import { mbtiProfiles } from "./descriptions/mbtiProfiles";
// // import { OtherTestsSlider } from "../OtherTests/otherTests";
// // import ProfileCard from "./ProfileCard";

// // const MBTITest = () => {
// //   const userID = useAuth((state) => state.user.id);
// //   const theme = useMantineTheme();
// //   const {
// //     currentQuestion,
// //     type,
// //     showResult,
// //     handleAnswer,
// //     checkResult,
// //     answers,
// //   } = useMBTIStore();
// //   const [hasTested, setHasTested] = useState(false);

// //   useEffect(() => {
// //     $host
// //       .get(`/api/mbti/${userID}`)
// //       .then((response) => {
// //         if (response.status === 200 && response.data.type) {
// //           setHasTested(true);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Ошибка при получении информации о MBTI:", error);
// //       });
// //   }, [userID]);

// //   useEffect(() => {
// //     localStorage.setItem("mbtiAnswers", JSON.stringify(answers));
// //   }, [answers]);

// //   const getTypeDescription = (type) => {
// //     const typeInfo = mbtiProfiles.find((profile) =>
// //       profile.title.includes(type)
// //     );
// //     return typeInfo ? typeInfo.description : "Описание недоступно.";
// //   };

// //   const getTypeAvatar = (type) => {
// //     const typeInfo = mbtiProfiles.find((profile) =>
// //       profile.title.includes(type)
// //     );
// //     return typeInfo ? typeInfo.avatar : "not_found.png";
// //   };

// //   const currentProfile = mbtiProfiles.find((profile) =>
// //     profile.title.includes(type)
// //   );

// //   const handleRetakeTest = () => {
// //     setHasTested(false); // Сбросить состояние прохождения теста
// //     checkResult(); // Проверить результат теста
// //   };

// //   const sendResultsToServer = () => {
// //     // Проверяем, что ответы есть и не пусты
// //     if (answers?.length > 0) {
// //       // Отправляем результаты теста на сервер
// //       $host
// //         .post(`/api/update-mbti-result/${userID}`, { answers })
// //         .then((response) => {
// //           if (response.status === 200) {
// //             console.log("Результат успешно отправлен на сервер");
// //           } else {
// //             console.error("Ошибка при отправке результата на сервер");
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Ошибка при отправке результата на сервер:", error);
// //         });
// //       // Сохраняем результаты теста в локальное хранилище
// //       localStorage.setItem("mbtiResult", JSON.stringify(answers));
// //     } else {
// //       console.error("Нет данных для отправки на сервер");
// //     }
// //   };

// //   // Проверяем результаты и отправляем на сервер, если пользователь прошел тест
// //   useEffect(() => {
// //     if (showResult && hasTested) {
// //       sendResultsToServer();
// //     }
// //   }, [showResult, hasTested]);

// //   return (
// //     <Stack pt={40}>
// //       <Title ta="center">Тест MBTI</Title>
// //       {hasTested && currentProfile && !showResult && (
// //         <>
// //           <ProfileCard profile={currentProfile} />
// //           <Button onClick={handleRetakeTest}>Пройти еще раз</Button>
// //           <Card radius="md" p="lg" mb={100}>
// //             <Stack>
// //               <Title order={2}>Доступные тестирования</Title>
// //               <OtherTestsSlider excludeTest="Тестирование MBTI" />
// //             </Stack>
// //           </Card>
// //         </>
// //       )}
// //       {!hasTested && currentQuestion < questions.length && (
// //         <div>
// //           <Text className="question" ta="center" pb={20} size="lg">
// //             {questions[currentQuestion].text}
// //           </Text>
// //           <Flex mt={10} justify="center">
// //             <Box
// //               style={{
// //                 width: "100%",
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(2, 1fr)",
// //                 gap: 12,
// //                 textAlign: "center",
// //                 margin: "0px auto",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               {questions[currentQuestion].options.map((option, index) => (
// //                 <Button
// //                   key={index}
// //                   variant="default"
// //                   onClick={() =>
// //                     handleAnswer(questions[currentQuestion].id, index - 3)
// //                   }
// //                 >
// //                   {option}
// //                 </Button>
// //               ))}
// //             </Box>
// //           </Flex>
// //         </div>
// //       )}
// //       {showResult && (
// //         <>
// //           <Card radius={10} pb={30}>
// //             <Title order={2}>Результаты теста</Title>
// //             <Flex gap={20} direction={{ sm: "row", base: "column" }}>
// //               <Image
// //                 src={getTypeAvatar(type)}
// //                 alt={getTypeAvatar(type)}
// //                 w={{ sm: "25%", base: "90%" }}
// //                 m="auto"
// //                 ta="center"
// //                 pt={40}
// //               />
// //               <Stack mt={"auto"}>
// //                 <Text size="lg" style={{ marginTop: theme.spacing.sm }}>
// //                   Ваш тип личности:{" "}
// //                   {type ? `${type}` : "Вычисление результата..."}
// //                 </Text>
// //                 <Text size="lg">
// //                   Описание типа:{" "}
// //                   {type
// //                     ? getTypeDescription(type)
// //                     : "Описание типа загружается..."}
// //                 </Text>
// //               </Stack>
// //             </Flex>
// //           </Card>
// //           <Card radius="md" p="lg" pb={120}>
// //             <Stack>
// //               <Title order={2}>Доступные тестирования</Title>
// //               <OtherTestsSlider excludeTest="Тестирование MBTI" />
// //             </Stack>
// //           </Card>
// //         </>
// //       )}
// //     </Stack>
// //   );
// // };

// // export default MBTITest;

// // Тут грузится результат пользователя если он проходил тест, но если перепройти тест - результат не отправляется на сервер =(
// // import { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   Flex,
// //   Stack,
// //   Text,
// //   Title,
// //   useMantineTheme,
// //   Image,
// //   Card,
// // } from "@mantine/core";
// // import { questions } from "./questions";
// // import { useAuth, useMBTIStore } from "@/Store";
// // import { $host } from "@/Services/instance";
// // import { mbtiProfiles } from "./descriptions/mbtiProfiles";
// // import { OtherTestsSlider } from "../OtherTests/otherTests";
// // import ProfileCard from "./ProfileCard";

// // const MBTITest = () => {
// //   const userID = useAuth((state) => state.user.id);
// //   const theme = useMantineTheme();
// //   const {
// //     currentQuestion,
// //     type,
// //     showResult,
// //     handleAnswer,
// //     checkResult,
// //     answers,
// //   } = useMBTIStore();
// //   const [hasTested, setHasTested] = useState(false);

// //   useEffect(() => {
// //     $host
// //       .get(`/api/mbti/${userID}`)
// //       .then((response) => {
// //         if (response.status === 200 && response.data.type) {
// //           setHasTested(true);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Ошибка при получении информации о MBTI:", error);
// //       });
// //   }, [userID]);

// //   useEffect(() => {
// //     localStorage.setItem("mbtiAnswers", JSON.stringify(answers));
// //   }, [answers]);

// //   const getTypeDescription = (type) => {
// //     const typeInfo = mbtiProfiles.find((profile) =>
// //       profile.title.includes(type)
// //     );
// //     return typeInfo ? typeInfo.description : "Описание недоступно.";
// //   };

// //   const getTypeAvatar = (type) => {
// //     const typeInfo = mbtiProfiles.find((profile) =>
// //       profile.title.includes(type)
// //     );
// //     return typeInfo ? typeInfo.avatar : "not_found.png";
// //   };

// //   const currentProfile = mbtiProfiles.find((profile) =>
// //     profile.title.includes(type)
// //   );

// //   const handleRetakeTest = () => {
// //     setHasTested(false); // Сбросить состояние прохождения теста
// //     checkResult(); // Проверить результат теста
// //   };

// //   const sendResultsToServer = () => {
// //     // Проверяем, что ответы есть и не пусты
// //     if (answers?.length > 0) {
// //       // Отправляем результаты теста на сервер
// //       $host
// //         .post(`/api/update-mbti-result/${userID}`, { answers })
// //         .then((response) => {
// //           if (response.status === 200) {
// //             console.log("Результат успешно отправлен на сервер");
// //           } else {
// //             console.error("Ошибка при отправке результата на сервер");
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Ошибка при отправке результата на сервер:", error);
// //         });
// //       // Сохраняем результаты теста в локальное хранилище
// //       localStorage.setItem("mbtiResult", JSON.stringify(answers));
// //     } else {
// //       console.error("Нет данных для отправки на сервер");
// //     }
// //   };

// //   // Проверяем результаты и отправляем на сервер, если пользователь прошел тест
// //   useEffect(() => {
// //     if (showResult && hasTested) {
// //       sendResultsToServer();
// //     }
// //   }, [showResult, hasTested]);

// //   return (
// //     <Stack pt={40}>
// //       <Title ta="center">Тест MBTI</Title>
// //       {hasTested && currentProfile && (
// //         <>
// //           <ProfileCard profile={currentProfile} />
// //           <Button onClick={handleRetakeTest}>Пройти еще раз</Button>
// //           <Card radius="md" p="lg" mb={100}>
// //             <Stack>
// //               <Title order={2}>Доступные тестирования</Title>
// //               <OtherTestsSlider excludeTest="Тестирование MBTI" />
// //             </Stack>
// //           </Card>
// //         </>
// //       )}
// //       {!hasTested && currentQuestion < questions.length && (
// //         <div>
// //           <Text className="question" ta="center" pb={20} size="lg">
// //             {questions[currentQuestion].text}
// //           </Text>
// //           <Flex mt={10} justify="center">
// //             <Box
// //               style={{
// //                 width: "100%",
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(2, 1fr)",
// //                 gap: 12,
// //                 textAlign: "center",
// //                 margin: "0px auto",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               {questions[currentQuestion].options.map((option, index) => (
// //                 <Button
// //                   key={index}
// //                   variant="default"
// //                   onClick={() =>
// //                     handleAnswer(questions[currentQuestion].id, index - 3)
// //                   }
// //                 >
// //                   {option}
// //                 </Button>
// //               ))}
// //             </Box>
// //           </Flex>
// //         </div>
// //       )}
// //     </Stack>
// //   );
// // };

// // export default MBTITest;


// // // Тут результат отправляется на сервер, но не получается при загрузке страницы (если пользователь проходил тест - нужно грузить результат, а также давать возможность пройти тест заново)
// // import { useEffect } from "react";
// // import {
// //   Box,
// //   Button,
// //   Flex,
// //   Stack,
// //   Text,
// //   Title,
// //   useMantineTheme,
// //   Image,
// //   Card,
// // } from "@mantine/core";
// // import { questions } from "./questions";
// // import { useAuth, useMBTIStore } from "@/Store";
// // import { $host } from "@/Services/instance";
// // import { mbtiProfiles } from "./descriptions/mbtiProfiles";
// // import { OtherTestsSlider } from "../OtherTests/otherTests";

// // const MBTITest = () => {
// //   const userID = useAuth((state) => state.user.id);
// //   const theme = useMantineTheme();
// //   const {
// //     currentQuestion,
// //     type,
// //     showResult,
// //     handleAnswer,
// //     checkResult,
// //     answers,
// //   } = useMBTIStore();

// //   useEffect(() => {
// //     if (showResult) {
// //       checkResult();

// //       $host
// //         .post(`/api/update-mbti-result/${userID}`, { type })
// //         .then((response) => {
// //           if (response.status === 200) {
// //             console.log("Результат успешно отправлен на сервер");
// //           } else {
// //             console.error("Ошибка при отправке результата на сервер");
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Ошибка при отправке результата на сервер:", error);
// //         });

// //       localStorage.setItem("mbtiResult", type);
// //     }
// //   }, [showResult, checkResult, type, userID]);

// //   useEffect(() => {
// //     localStorage.setItem("mbtiAnswers", JSON.stringify(answers));
// //   }, [answers]);

// //   const getTypeDescription = (type) => {
// //     const typeInfo = mbtiProfiles.find((profile) =>
// //       profile.title.includes(type)
// //     );
// //     return typeInfo ? typeInfo.description : "Описание недоступно.";
// //   };

// //   const getTypeAvatar = (type) => {
// //     const typeInfo = mbtiProfiles.find((profile) =>
// //       profile.title.includes(type)
// //     );
// //     return typeInfo ? typeInfo.avatar : "placeholder.jpg";
// //   };

// //   return (
// //     <Stack pt={40}>
// //       <Title ta="center">Тест MBTI</Title>
// //       {currentQuestion < questions.length && (
// //         <div>
// //           <Text className="question" ta="center" pb={20} size="lg">
// //             {questions[currentQuestion].text}
// //           </Text>
// //           <Flex mt={10} justify="center">
// //             <Box
// //               style={{
// //                 width: "100%",
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(2, 1fr)",
// //                 gap: 12,
// //                 textAlign: "center",
// //                 margin: "0px auto",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               {questions[currentQuestion].options.map((option, index) => (
// //                 <Button
// //                   key={index}
// //                   variant="default"
// //                   onClick={() =>
// //                     handleAnswer(questions[currentQuestion].id, index - 3)
// //                   }
// //                 >
// //                   {option}
// //                 </Button>
// //               ))}
// //             </Box>
// //           </Flex>
// //         </div>
// //       )}
// //       {showResult && (
// //         <>
// //           <Card radius={10} pb={30}>
// //             <Title order={2}>Результаты теста</Title>
// //             <Flex gap={20} direction={{ sm: "row", base: "column" }}>
// //               <Image
// //                 src={getTypeAvatar(type)}
// //                 alt={getTypeAvatar(type)}
// //                 w={{ sm: "25%", base: "90%" }}
// //                 m="auto"
// //                 ta="center"
// //                 pt={40}
// //               />
// //               <Stack mt={"auto"}>
// //                 <Text size="lg" style={{ marginTop: theme.spacing.sm }}>
// //                   Ваш тип личности:{" "}
// //                   {type ? `${type}` : "Вычисление результата..."}
// //                 </Text>
// //                 <Text size="lg">
// //                   Описание типа:{" "}
// //                   {type
// //                     ? getTypeDescription(type)
// //                     : "Описание типа загружается..."}
// //                 </Text>
// //               </Stack>
// //             </Flex>
// //           </Card>
// //           <Card radius="md" p="lg" pb={120}>
// //             <Stack>
// //               <Title order={2}>Доступные тестирования</Title>
// //               <OtherTestsSlider excludeTest="Тестирование MBTI" />
// //             </Stack>
// //           </Card>
// //         </>
// //       )}
// //     </Stack>
// //   );
// // };

// // export default MBTITest;
