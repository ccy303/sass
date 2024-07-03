import request from "./request";

export const getAuditRuleByMuseumIdAndType = ({ museumId, auditType }) => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/auditRule/getByMuseumIdAndType?museumId=${museumId}&auditType=${auditType}` });
};
