"""adding new ebum to job status

Revision ID: 18c635c0bba5
Revises: 18ab7fc8fe87
Create Date: 2026-01-06 04:20:19.187140

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "18c635c0bba5"
down_revision: Union[str, Sequence[str], None] = "18ab7fc8fe87"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("ALTER TYPE job_status ADD VALUE IF NOT EXISTS 'PENDING'")

    # 2. Commit the transaction manually
    # PG requires the enum change to be committed before it can be used
    # to cast columns or insert data in the same migration run.


def downgrade() -> None:
    """Downgrade schema."""
    pass
