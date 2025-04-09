import { useRouter } from "next/navigation";
import { useModalContext } from "./context";

export function ModalRenderer() {
  const { openedModals, setModalState } = useModalContext();
  const router = useRouter()


  return (
    <div>
      <h1>Modal Renderer</h1>
      <p>This is the modal renderer.</p>
      <button onClick={() => setModalState("new-modal", { open: true, value: "OMG" })}>
        close new
      </button>
      <button onClick={() => setModalState("old-modal", { open: false })}>
        close old
      </button>

      <button onClick={() => router.push('/')}>Jump to home</button>
    </div>
  );
}
