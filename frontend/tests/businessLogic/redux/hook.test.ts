import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux");

describe("Redux Typed Hooks", () => {
  const mockDispatch = jest.fn();
  const mockState = { value: 123 };

  beforeEach(() => {
    mockDispatch.mockClear();

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn(mockState)
    );
  });

  test("useAppDispatch returns the redux dispatch function", () => {
    const dispatch = useAppDispatch();

    dispatch({ type: "TEST_ACTION" });

    expect(mockDispatch).toHaveBeenCalledWith({ type: "TEST_ACTION" });
  });

  test("useAppSelector calls selector with state and returns its value", () => {
    const selector = jest.fn((s) => s.value);

    const result = useAppSelector(selector);

    expect(selector).toHaveBeenCalledWith(mockState);
    expect(result).toBe(123);
  });
});
