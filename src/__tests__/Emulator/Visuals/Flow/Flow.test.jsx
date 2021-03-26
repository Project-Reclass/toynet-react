import { renderWithTheme } from "src/common/test-utils/renderWithTheme";
import Flow from "src/Emulator/Visuals/Flow";

describe('Flow', () => {
  it('should match the snapshot', () => {
    const { container } = renderWithTheme(<Flow />);
    expect(container).toMatchSnapshot();
  });
});