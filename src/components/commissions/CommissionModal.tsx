import { motion } from "framer-motion";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { Alert } from "flowbite-react";
import api from "../../api/JavaAxiosConfig";

interface CommissionModalProps {
  onClose: () => void;
  onSubmit: (config: { type: string; value: string }) => void;
}

const CommissionModal = ({ onClose, onSubmit }: CommissionModalProps) => {
  const [commissionType, setCommissionType] = useState("vente");
  const [commissionValue, setCommissionValue] = useState("");
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error', content: string } | null>(null);

  const handleSubmit = async () => {
    const url = commissionType === "vente" ? "configVente" : "configAchat";
    const response = await api.post(`commission/${url}`, {valeur: commissionValue});
    
    if (response.data !== "succes") {
      setAlertMessage({ type: 'error', content: `Configuration échouée pour ${commissionType}` });
    } else {
      setAlertMessage({ type: 'success', content: 'Configuration des commissions mise à jour' });
      setTimeout(onClose, 2000); // Close after 2 seconds
    }
    onClose();
    onSubmit({ type: commissionType, value: commissionValue });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-light rounded-xl p-6 w-fit max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-5 mb-2">
          <FaGear className="w-6 h-6 text-dark" />
          <h2 className="text-2xl uppercase font-title font-bold text-dark">
            Configuration de commission
          </h2>
        </div>
        <p className="text-slate-500 font-body mb-4">
          Changer la valeur du pourcentage des commissions reçues par la plateforme par opération
        </p>

        {alertMessage && (
          <Alert color={alertMessage.type} className="mb-4">
            {alertMessage.content}
          </Alert>
        )}

        <form>
          <div className="mb-4">
            <label className="block text-base font-body text-dark mb-2">
              Type de commission
            </label>
            <select
              value={commissionType}
              onChange={(e) => setCommissionType(e.target.value)}
              className="w-full p-2 border font-body rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
            >
              <option value="vente">Vente</option>
              <option value="achat">Achat</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-base font-body text-dark mb-2">
              Valeur
            </label>
            <input
              type="number"
              value={commissionValue}
              onChange={(e) => setCommissionValue(e.target.value)}
              className="w-full font-body p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="0.00%"
              step="0.01"
              required
            />
          </div>

          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={onClose}
              className="border-main border-2 hover:border-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-main hover:text-main-700 gap-4"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-main hover:bg-main-700 px-5 py-6 font-body rounded-3xl h-10 flex items-center justify-center text-light gap-4"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CommissionModal;