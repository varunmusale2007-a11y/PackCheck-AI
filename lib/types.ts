export interface RuleResult {
  rule_id: string;
  rule_name: string;
  legal_clause: string;
  status: "PASS" | "FAIL" | "WARNING";
  is_mandatory: boolean;
  extracted_value: string | null;
  extracted_tokens?: string[];
  confidence: number;
  reason: string;
  suggestion?: string | null;
  legal_reference?: string | null;
}

export interface ComplianceReport {
  id?: number;
  product_name: string;
  category: string;
  image_filename?: string | null;
  image_path?: string | null;
  ocr_text: string;
  ocr_confidence: number;
  compliance_score: number;
  status: "COMPLIANT" | "PARTIALLY_COMPLIANT" | "NON_COMPLIANT";
  total_rules: number;
  passed_rules: number;
  failed_rules: number;
  warning_rules: number;
  rules_detail: RuleResult[];
  missing_fields: string[];
  penalty_estimate_inr: number;
  penalty_info?: {
    estimated_fine_inr: number;
    risk_level: "LOW" | "MEDIUM" | "HIGH";
    section_reference: string;
    legal_consequence: string;
  };
  created_at?: string;
}

export interface OCRResponse {
  text: string;
  confidence: number;
  tokens_count: number;
  preprocessing_applied: string[];
}

export interface StatsResponse {
  total_scans: number;
  compliant_count: number;
  partially_compliant_count: number;
  non_compliant_count: number;
  average_compliance_score: number;
  category_distribution: Record<string, number>;
  top_missing_declarations: Array<{
    field: string;
    count: number;
    percentage: number;
  }>;
}

export interface SamplePreset {
  id: string;
  product_name: string;
  category: string;
  image_filename: string;
  ocr_confidence: number;
  text: string;
  expected_score?: number;
}
