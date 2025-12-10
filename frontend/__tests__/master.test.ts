// __tests__/master.test.ts

//
// 1. API TESTS
//
import "./businessLogic/api/api.test";

//
// 2. REDUX TESTS
//
import "./businessLogic/redux/store.test";
import "./businessLogic/redux/hook.test";
import "./businessLogic/redux/reservationslice.test";

//
// 3. SCREEN TESTS (RESERVATION)
//
import "./businessLogic/screens/reservation.test";
import "./businessLogic/screens/upcoming.test";
import "./businessLogic/screens/cancelled.test";
import "./businessLogic/screens/checkedIn.test";

//
// 4. SCREEN TESTS (NEW RESERVATION FLOW)
//
import "./businessLogic/screens/hooks.test";
import "./businessLogic/screens/newreservationhooks.test";
import "./businessLogic/screens/newreservationform.test";

//
// 5. UTILS TESTS
//
import "./businessLogic/utils/utils.test";
